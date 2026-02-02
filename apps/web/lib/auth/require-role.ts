import { redirect } from 'next/navigation';
import { getSessionProfile } from '@/lib/auth/session';
import { hasRequiredRole, type AppRole } from '@/lib/auth/roles';

export async function requireRole(required: AppRole) {
  const profile = await getSessionProfile();

  if (!profile) {
    redirect('/login');
  }

  if (!profile.role || !hasRequiredRole(profile.role, required)) {
    redirect('/unauthorized');
  }

  return profile;
}
