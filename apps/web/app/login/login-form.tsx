'use client';

import { useActionState } from 'react';
import { signInWithPassword, type LoginState } from './actions';

const initialState: LoginState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signInWithPassword,
    initialState,
  );

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" action={formAction}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700" htmlFor="password">
          Senha
        </label>
        <input
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}
      <button
        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        type="submit"
        disabled={pending}
      >
        {pending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
