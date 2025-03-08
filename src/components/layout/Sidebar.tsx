'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  User, 
  PieChart, 
  LogOut,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { ReportBugModal } from '@/components/ui/report-bug-modal';
import { FeedbackModal } from '@/components/ui/feedback-modal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Contatos', href: '/contacts' },
  { icon: Briefcase, label: 'Negócios', href: '/business' },
  { icon: CheckSquare, label: 'Tarefas', href: '/tasks' },
  { icon: User, label: 'Perfil', href: '/profile' },
  { icon: PieChart, label: 'Relatórios', href: '/reports' },
  { icon: Users, label: 'Usuários', href: '/users' },
];

const footerMenuItems = [
  { component: ReportBugModal },
  { component: FeedbackModal },
  { icon: LogOut, label: 'Sair', href: '/logout' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavLink = ({ item, className = '' }) => {
    if (item.component) {
      const Component = item.component;
      const componentContent = (
        <div className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg
          transition-all duration-200 font-medium
          text-gray-600 hover:bg-gray-50 hover:text-gray-900
          ${className}
          ${isCollapsed ? 'justify-center' : ''}
        `}>
          <Component />
        </div>
      );

      return isCollapsed ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {componentContent}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label || (item.component.name === 'ReportBugModal' ? 'Reportar Bug' : 'Enviar Feedback')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : componentContent;
    }

    const isActive = pathname === item.href;
    const linkContent = (
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg
          transition-all duration-200 font-medium
          ${isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }
          ${className}
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
        {!isCollapsed && <span className="text-sm">{item.label}</span>}
      </Link>
    );

    return isCollapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : linkContent;
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300`}>
      <div className="flex flex-col h-full">
        {/* Logo and Toggle */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!isCollapsed && (
            <Image
              src="/images/logo-tecnoportas.png"
              alt="Tecnoportas Logo"
              width={80}
              height={40}
              className="mx-auto"
              priority
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${isCollapsed ? 'mx-auto' : ''} hover:bg-gray-100`}
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Main Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1.5">
            {mainMenuItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Navigation */}
        <div className="px-3 pb-6">
          <div className="pt-4 border-t border-gray-100">
            {/* Footer Menu */}
            <ul className="space-y-1">
              {footerMenuItems.map((item) => (
                <li key={item.href || item.component?.name}>
                  <NavLink 
                    item={item} 
                    className={item.label === 'Sair' ? 'text-red-600 hover:bg-red-50 hover:text-red-700' : ''}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}; 