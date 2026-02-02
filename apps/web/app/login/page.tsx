import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LoginForm } from './login-form';

export default async function LoginPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-900">
            TecnoLeads
          </h1>
          <p className="text-sm text-zinc-600">
            Entre com seu email e senha para acessar o CRM.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
