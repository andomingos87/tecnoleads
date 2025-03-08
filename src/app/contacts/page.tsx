'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  List, 
  LayoutGrid,
  Plus,
  ArrowUpDown,
  Phone,
  Mail,
  Trash,
  Edit,
  Eye,
  X,
  Briefcase,
  CalendarClock
} from 'lucide-react';
import { ContactDetailsModal } from '@/components/contacts/ContactDetailsModal';
import { ContactsKanban } from '@/components/contacts/ContactsKanban';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - substituir por dados reais da API
const leads = [
  { 
    id: 1,
    name: 'Maria Silva',
    company: 'Tech Corp',
    email: 'maria@techcorp.com',
    phone: '(11) 99999-9999',
    status: 'new',
    lastContact: '2024-03-07',
    city: 'São Paulo',
    state: 'SP',
    hasDeals: true // Mock para indicar se tem negócios vinculados
  },
  {
    id: 2,
    name: 'João Santos',
    company: 'Data Systems',
    email: 'joao@datasystems.com',
    phone: '(11) 98888-8888',
    status: 'contacted',
    lastContact: '2024-03-06',
    city: 'Rio de Janeiro',
    state: 'RJ'
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    company: 'Smart Solutions',
    email: 'ana@smartsolutions.com',
    phone: '(11) 97777-7777',
    status: 'qualified',
    lastContact: '2024-03-05',
    city: 'Curitiba',
    state: 'PR'
  }
];

const statusColors = {
  new: { bg: 'bg-green-100', text: 'text-green-800' },
  contacted: { bg: 'bg-blue-100', text: 'text-blue-800' },
  qualified: { bg: 'bg-purple-100', text: 'text-purple-800' },
  inactive: { bg: 'bg-gray-100', text: 'text-gray-800' }
};

const statusLabels = {
  new: 'Novo Lead',
  contacted: 'Contato Iniciado',
  qualified: 'Qualificado',
  inactive: 'Inativo'
};

export default function ContactsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    state: '',
    status: ''
  });
  const [sorting, setSorting] = useState({ field: '', direction: 'asc' });
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedContactForAction, setSelectedContactForAction] = useState(null);

  // Verifica se há algum filtro ativo
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleSort = (field: string) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(prev => 
      prev.length === leads.length ? [] : leads.map(lead => lead.id)
    );
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      city: '',
      state: '',
      status: ''
    });
  };

  const handleStatusChange = (contactId: number, newStatus: string) => {
    // Implementar lógica de atualização do status
    console.log('Mudando status:', contactId, newStatus);
    // Aqui você chamaria sua API para atualizar o status
  };

  const handleWhatsAppClick = (phone: string) => {
    const phoneNumber = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phoneNumber}`, '_blank');
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCreateTask = (contactId: number) => {
    setSelectedContactForAction(leads.find(lead => lead.id === contactId));
    setIsTaskDialogOpen(true);
  };

  const handleSubmitTask = (data: any) => {
    // Implementar lógica de criação de tarefa
    console.log('Criando tarefa:', data);
    setIsTaskDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Contatos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie seus leads e contatos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('kanban')}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Kanban
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Contato
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar contatos..."
                className="pl-10"
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div>
              <Select
                value={filters.city}
                onValueChange={value => setFilters(prev => ({ ...prev, city: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sao-paulo">São Paulo</SelectItem>
                  <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="curitiba">Curitiba</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={filters.state}
                onValueChange={value => setFilters(prev => ({ ...prev, state: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={filters.status}
                onValueChange={value => setFilters(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Novo Lead</SelectItem>
                  <SelectItem value="contacted">Contato Iniciado</SelectItem>
                  <SelectItem value="qualified">Qualificado</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="mt-2 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>

        {viewMode === 'list' ? (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.length === leads.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Nome
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                      onClick={() => handleSort('company')}
                    >
                      <div className="flex items-center gap-2">
                        Empresa
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Telefone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                      onClick={() => handleSort('lastContact')}
                    >
                      <div className="flex items-center gap-2">
                        Último Contato
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(lead.id)}
                          onChange={() => handleSelectContact(lead.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-4">{lead.name}</td>
                      <td className="py-3 px-4">{lead.company}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleEmailClick(lead.email)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleWhatsAppClick(lead.phone)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status].bg} ${statusColors[lead.status].text}`}>
                          {statusLabels[lead.status]}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedContact(lead)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            {lead.hasDeals && (
                              <DropdownMenuItem>
                                <Briefcase className="w-4 h-4 mr-2" />
                                Ver Negócios
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleCreateTask(lead.id)}>
                              <CalendarClock className="w-4 h-4 mr-2" />
                              Criar Tarefa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando 1-3 de 3 resultados
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="outline" disabled>
                  Próximo
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4">
            <ContactsKanban
              contacts={leads}
              onContactClick={setSelectedContact}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      <ContactDetailsModal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        contact={selectedContact}
      />

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Tarefa</DialogTitle>
            <DialogDescription>
              Criar uma nova tarefa para {selectedContactForAction?.name}
            </DialogDescription>
          </DialogHeader>
          
          {/* Aqui você pode adicionar os campos do formulário de tarefa */}
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título da Tarefa</label>
              <Input placeholder="Digite o título da tarefa" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Input placeholder="Digite a descrição da tarefa" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data de Vencimento</label>
              <Input type="date" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitTask}>
              Criar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 