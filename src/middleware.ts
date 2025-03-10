import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Permitir acesso às rotas de autenticação
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    // Se o usuário já estiver autenticado e tentar acessar páginas de auth, redireciona para dashboard
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return response
  }

  // Se não estiver autenticado e tentar acessar rotas protegidas, redireciona para login
  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/',
    '/overview',
    '/dashboard',
    '/contacts',
    '/business',
    '/tasks',
    '/tasks/:path*',
    '/profile',
    '/metrics',
    '/settings',
    '/reports',
    '/users',
    '/create-task',
    '/auth/:path*'  // Adiciona matcher para rotas de autenticação
  ]
} 