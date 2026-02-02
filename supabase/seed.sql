-- Seed roles for initial DEV/Admin users after signup.
-- Replace the UUIDs after creating the users in Supabase Auth.

-- DEV user (created via script in database)
update public.profiles
set role = 'dev'
where id = '00000000-0000-0000-0000-000000000000';

-- First Admin user
update public.profiles
set role = 'admin'
where id = '11111111-1111-1111-1111-111111111111';
