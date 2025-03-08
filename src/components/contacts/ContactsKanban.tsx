'use client';

import React from 'react';
import { Phone, Mail, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  lastContact: string;
  city?: string;
  state?: string;
}

interface ContactsKanbanProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  onStatusChange: (contactId: number, newStatus: string) => void;
}

const statusColumns = [
  { id: 'new', label: 'Novo Lead', color: 'border-green-400' },
  { id: 'contacted', label: 'Contato Iniciado', color: 'border-blue-400' },
  { id: 'qualified', label: 'Qualificados', color: 'border-purple-400' },
  { id: 'inactive', label: 'Inativos', color: 'border-gray-400' },
];

export function ContactsKanban({ contacts, onContactClick, onStatusChange }: ContactsKanbanProps) {
  const getContactsByStatus = (status: string) => {
    return contacts.filter(contact => contact.status === status);
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
      {statusColumns.map(column => (
        <div 
          key={column.id}
          className="flex flex-col bg-gray-50 rounded-lg p-4"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${column.color.split('-')[1]}`} />
              <h3 className="font-medium text-gray-900">{column.label}</h3>
            </div>
            <span className="text-sm text-gray-500">
              {getContactsByStatus(column.id).length}
            </span>
          </div>

          {/* Cards Container */}
          <div className="space-y-3 overflow-y-auto flex-1">
            {getContactsByStatus(column.id).map(contact => (
              <div
                key={contact.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-all cursor-pointer"
                onClick={() => onContactClick(contact)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statusColumns.map(status => (
                        <DropdownMenuItem
                          key={status.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusChange(contact.id, status.id);
                          }}
                        >
                          Mover para {status.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{contact.email}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Último contato: {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 