import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { AppRole } from '@/lib/auth/roles';

export type SessionProfile = {
  id: string;
  role: AppRole | null;
  email: string | null;
};

export async function getSessionProfile() {
  const supabase = createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: user.id,
    role: (profile?.role as AppRole | null) ?? null,
    email: user.email ?? null,
  } satisfies SessionProfile;
}
