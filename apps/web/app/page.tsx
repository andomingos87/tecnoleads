import { redirect } from 'next/navigation';
import { getSessionProfile } from '@/lib/auth/session';
import { signOut } from '@/app/login/actions';

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-zinc-50 px-8 py-10">
      <section className="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-zinc-900">
            Bem-vindo ao TecnoLeads
          </h1>
          <p className="text-sm text-zinc-600">
            Usuario: {profile.email ?? 'sem email'} | Role: {profile.role ?? 'n/a'}
          </p>
        </div>
        <form action={signOut}>
          <button className="rounded-md border border-zinc-200 px-4 py-2 text-sm">
            Sair
          </button>
        </form>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Carteira Gerencial</p>
          <p className="text-2xl font-semibold text-zinc-900">0</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Carteira Comercial</p>
          <p className="text-2xl font-semibold text-zinc-900">0</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Leads sem proprietario</p>
          <p className="text-2xl font-semibold text-zinc-900">0</p>
        </div>
      </section>
    </main>
  );
}
