-- Run before deploying the protected Playbook route.
create table if not exists public.playbook_rate_limits (
  bucket_key text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);
alter table public.playbook_rate_limits enable row level security;
revoke all on public.playbook_rate_limits from anon, authenticated;

create or replace function public.claim_playbook_request(bucket_keys text[])
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  i integer;
  attempts_now integer;
  allowed boolean := true;
begin
  if cardinality(bucket_keys) <> 2 or bucket_keys[1] is null or bucket_keys[2] is null then
    raise exception 'Invalid buckets';
  end if;
  -- Atomic upserts serialize concurrent claims across all application instances.
  delete from public.playbook_rate_limits where expires_at <= now();
  for i in 1..2 loop
    insert into public.playbook_rate_limits as b (bucket_key, attempts, expires_at)
    values (bucket_keys[i], 1, now() + interval '1 hour')
    on conflict (bucket_key) do update set
      attempts = case when b.expires_at <= now() then 1 else b.attempts + 1 end,
      expires_at = case when b.expires_at <= now() then now() + interval '1 hour' else b.expires_at end
    returning attempts into attempts_now;
    if attempts_now > (case when i = 1 then 5 else 2 end) then allowed := false; end if;
  end loop;
  return allowed;
end;
$$;
revoke all on function public.claim_playbook_request(text[]) from public, anon, authenticated;
grant execute on function public.claim_playbook_request(text[]) to service_role;
