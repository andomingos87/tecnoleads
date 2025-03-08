'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Calendar,
  MessageCircle,
  UserPlus,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export function ContactDetailsModal({ isOpen, onClose, contact }: ContactDetailsModalProps) {
  if (!contact) return null;

  const handleWhatsAppClick = () => {
    const phoneNumber = contact.phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phoneNumber}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Contato</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
              <p className="text-sm text-gray-500">{contact.company}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                  ${contact.status === 'new' ? 'bg-green-100 text-green-700' :
                    contact.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                    contact.status === 'qualified' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'}`}>
                  {contact.status === 'new' ? 'Novo Lead' :
                   contact.status === 'contacted' ? 'Contato Iniciado' :
                   contact.status === 'qualified' ? 'Qualificado' :
                   'Inativo'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.phone}</p>
                  <p className="text-xs text-gray-500">Telefone</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.email}</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.city}, {contact.state}</p>
                  <p className="text-xs text-gray-500">Localização</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.company}</p>
                  <p className="text-xs text-gray-500">Empresa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-500">Último contato</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t pt-4">
            <Button
              variant="default"
              className="flex-1"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleEmailClick}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Transferir
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 