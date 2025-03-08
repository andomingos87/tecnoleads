'use client';

import React, { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Moon, 
  Plus, 
  ChevronLeft,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { NotificationsList } from '@/components/notifications/NotificationsList';

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end">
      

      <div className="flex items-center gap-4">
        <NotificationsList />

        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Modo Escuro">
          <Moon className="w-5 h-5" />
          <span className="sr-only">Modo Escuro</span>
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 