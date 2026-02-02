import { requireRole } from '@/lib/auth/require-role';

export default async function AdminPage() {
  const profile = await requireRole('admin');

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-zinc-50 px-8 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Area Admin</h1>
      <p className="text-sm text-zinc-600">
        Acesso concedido para: {profile.email ?? 'sem email'}
      </p>
    </main>
  );
}
