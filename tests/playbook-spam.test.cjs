const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file, dependencies = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', output)((name) => dependencies[name] ?? require(name), module, module.exports);
  return module.exports;
}
const spam = load('src/lib/playbook-spam.ts');
function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Marie-Luise O’Connor", email: 'marie@example.com', mobilePhone: '+49 (170) 1234567', company: 'Müller & Söhne GmbH', privacyAccepted: 'yes', companyWebsite: '', ...overrides })) data.set(key, value);
  return data;
}
test('international names and legitimate company accepted', () => {
  for (const name of ['Marie-Luise O’Connor', '李明', 'José Müller', 'Dr. Anna Meier']) assert.ok(spam.validatePlaybookForm(form({name})));
});
test('spam, invalid values, duplicate fields and file uploads rejected', () => {
  for (const change of [{name:'https://share.google/abc'}, {name:'search.app/xyz'}, {name:'share.google'}, {name:'www.example.com'}, {name:'A'.repeat(101)}, {name:'Anna\nBcc: evil'}, {companyWebsite:'spam'}, {privacyAccepted:'false'}, {email:'x@y'}, {mobilePhone:'------'}, {company:'https://search.app/a'}]) assert.equal(spam.validatePlaybookForm(form(change)), null);
  const duplicate=form();duplicate.append('name','Anna');assert.equal(spam.validatePlaybookForm(duplicate),null);
  const upload=form();upload.set('companyWebsite',new Blob(['x']),'x.txt');assert.equal(spam.validatePlaybookForm(upload),null);
});
test('route gates all side effects and legitimate requests send both mails', async () => {
  process.env.RESEND_API_KEY='test-key';
  let sends=0, saves=0, allowed=true, unavailable=false;
  const { POST }=load('src/app/api/playbook-request/route.ts', {
    '../../../lib/playbook-spam': {...spam, allowPlaybookRequest: async()=> {if(unavailable) throw Error();return allowed;}},
    '../../../lib/lead-storage': {saveLead:async()=>{saves++;}},
    resend:{Resend:class {emails={send:async()=>{sends++;return {error:null};}};}}
  });
  const submit=async(body)=>POST(new Request('https://example.com/api/playbook-request',{method:'POST',body}));
  for(const change of [{name:'https://share.google/a'},{name:'search.app/a'},{companyWebsite:'bot'},{privacyAccepted:'no'}]) assert.match((await submit(form(change))).headers.get('location'),/validation-error/);
  allowed=false;assert.match((await submit(form())).headers.get('location'),/rate-limited/);
  allowed=true;unavailable=true;assert.match((await submit(form())).headers.get('location'),/config-error/);
  unavailable=false;
  assert.match((await submit(new URLSearchParams({name:'x'.repeat(17000)}))).headers.get('location'),/validation-error/);
  assert.equal(sends,0);assert.equal(saves,0);
  assert.match((await submit(form())).headers.get('location'),/playbook-sent/);
  assert.equal(sends,2);assert.equal(saves,1);
});
test('central limiter hashes identities and fails closed on backend errors',async()=>{
  process.env.SUPABASE_URL='https://example.test';process.env.SUPABASE_SERVICE_ROLE_KEY='test-secret';process.env.VERCEL='1';
  const original=global.fetch;let result=true;
  global.fetch=async(_url, options)=>{const body=JSON.parse(options.body);assert.equal(body.bucket_keys.length,2);assert.ok(body.bucket_keys.every(k=>/^[a-f0-9]{64}$/.test(k)));return Response.json(result);};
  try {
    const request=new Request('https://example.com',{headers:{'x-vercel-forwarded-for':'192.0.2.1'}});
    assert.equal(await spam.allowPlaybookRequest(request,'a@example.com'),true);
    result=false;assert.equal(await spam.allowPlaybookRequest(request,'a@example.com'),false);
    global.fetch=async()=>new Response('',{status:503});await assert.rejects(spam.allowPlaybookRequest(request,'a@example.com'));
  } finally {global.fetch=original;}
});

test('local limits reserve concurrent requests and expire after one hour',async()=>{
  delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SERVICE_ROLE_KEY;delete process.env.VERCEL;
  const oldEnv=process.env.NODE_ENV;process.env.NODE_ENV='test';
  const originalNow=Date.now;let now=originalNow();Date.now=()=>now;
  try {
    const limiter=load('src/lib/playbook-spam.ts');const request=new Request('https://example.com');
    assert.deepEqual(await Promise.all([1,2,3].map(()=>limiter.allowPlaybookRequest(request,'a@example.com'))),[true,true,false]);
    assert.equal(await limiter.allowPlaybookRequest(request,'b@example.com'),true);
    assert.equal(await limiter.allowPlaybookRequest(request,'c@example.com'),true);
    assert.equal(await limiter.allowPlaybookRequest(request,'d@example.com'),false);
    now+=3600001;assert.equal(await limiter.allowPlaybookRequest(request,'a@example.com'),true);
    process.env.NODE_ENV='production';await assert.rejects(limiter.allowPlaybookRequest(request,'a@example.com'));
  } finally {Date.now=originalNow;if(oldEnv===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=oldEnv;}
});
