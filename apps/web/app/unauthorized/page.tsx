export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="flex max-w-md flex-col gap-2 rounded-lg bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Acesso negado</h1>
        <p className="text-sm text-zinc-600">
          Seu perfil nao tem permissao para acessar esta pagina.
        </p>
      </div>
    </div>
  );
}
