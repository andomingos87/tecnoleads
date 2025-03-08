'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  User,
  Plus,
  X,
  Calendar,
  ListFilter,
  CheckCircle,
  Circle,
  ArrowUpDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tasks = [
  {
    id: 1,
    title: 'Ligar para João',
    description: 'Fazer follow-up sobre a proposta enviada',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-10',
    assignee: 'Maria Silva'
  },
  {
    id: 2,
    title: 'Enviar proposta',
    description: 'Preparar e enviar proposta para Tech Corp',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-03-15',
    assignee: 'Pedro Santos'
  },
  {
    id: 3,
    title: 'Agendar reunião',
    description: 'Agendar apresentação do projeto',
    status: 'done',
    priority: 'low',
    dueDate: '2024-03-08',
    assignee: 'Ana Oliveira'
  },
  {
    id: 4,
    title: 'Revisar documentação',
    description: 'Atualizar a documentação técnica do projeto mobile',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-12',
    assignee: 'Carlos Mendes'
  },
  {
    id: 5,
    title: 'Preparar apresentação',
    description: 'Criar slides para a reunião com o cliente',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-03-14',
    assignee: 'Maria Silva'
  },
  {
    id: 6,
    title: 'Corrigir bug crítico',
    description: 'Resolver problema de autenticação no módulo de pagamentos',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-09',
    assignee: 'Lucas Costa'
  },
  {
    id: 7,
    title: 'Atualizar dependências',
    description: 'Atualizar pacotes npm e resolver conflitos',
    status: 'done',
    priority: 'low',
    dueDate: '2024-03-07',
    assignee: 'Pedro Santos'
  },
  {
    id: 8,
    title: 'Implementar novo layout',
    description: 'Desenvolver nova interface do dashboard conforme wireframes',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-03-18',
    assignee: 'Ana Oliveira'
  },
  {
    id: 9,
    title: 'Otimizar queries',
    description: 'Melhorar performance das consultas ao banco de dados',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-13',
    assignee: 'Carlos Mendes'
  },
  {
    id: 10,
    title: 'Configurar CI/CD',
    description: 'Implementar pipeline de integração contínua',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-03-06',
    assignee: 'Lucas Costa'
  },
  {
    id: 11,
    title: 'Criar testes unitários',
    description: 'Desenvolver suite de testes para novos componentes',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-03-16',
    assignee: 'Maria Silva'
  },
  {
    id: 12,
    title: 'Migrar banco de dados',
    description: 'Executar migração para nova versão do PostgreSQL',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-20',
    assignee: 'Pedro Santos'
  },
  {
    id: 13,
    title: 'Documentar API',
    description: 'Atualizar documentação Swagger dos novos endpoints',
    status: 'done',
    priority: 'low',
    dueDate: '2024-03-05',
    assignee: 'Ana Oliveira'
  },
  {
    id: 14,
    title: 'Refatorar módulo de relatórios',
    description: 'Melhorar estrutura e performance dos relatórios',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-17',
    assignee: 'Carlos Mendes'
  },
  {
    id: 15,
    title: 'Implementar autenticação 2FA',
    description: 'Adicionar segunda etapa de verificação no login',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-19',
    assignee: 'Lucas Costa'
  }
];

const statusConfig = {
  'pending': { 
    icon: Circle, 
    color: 'text-yellow-500',
    label: 'Pendente',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  'in-progress': { 
    icon: Clock, 
    color: 'text-blue-500',
    label: 'Em Andamento',
    badge: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  'done': { 
    icon: CheckCircle, 
    color: 'text-green-500',
    label: 'Concluído',
    badge: 'bg-green-100 text-green-700 border-green-200'
  }
};

const priorityConfig = {
  'high': {
    label: 'Alta',
    badge: 'bg-red-100 text-red-700 border-red-200'
  },
  'medium': {
    label: 'Média',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  'low': {
    label: 'Baixa',
    badge: 'bg-green-100 text-green-700 border-green-200'
  }
};

type ViewMode = 'board' | 'table';

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    assignee: ''
  });

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      assignee: ''
    });
  };

  const TaskCard = ({ task }) => {
    const status = statusConfig[task.status];
    const priority = priorityConfig[task.priority];
    const StatusIcon = status.icon;

    return (
      <Card className="group hover:shadow-md transition-all duration-200">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`shrink-0 h-6 w-6 ${status.color}`}
              >
                <StatusIcon className="w-4 h-4" />
              </Button>
              <div className="min-w-0">
                <h3 className="font-medium truncate">{task.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{task.description}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                <DropdownMenuItem>Editar tarefa</DropdownMenuItem>
                <DropdownMenuItem>
                  Marcar como {task.status === 'done' ? 'pendente' : 'concluída'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={priority.badge}>
              {priority.label}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground border-muted">
              {new Date(task.dueDate).toLocaleDateString('pt-BR')}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span className="truncate">{task.assignee}</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tarefas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie suas tarefas e acompanhe o progresso das atividades
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === 'board' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('board')}
          >
            <ListFilter className="w-4 h-4 mr-2" />
            Board
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Tabela
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Tarefas</p>
                <h3 className="text-2xl font-bold mt-1">{tasks.length}</h3>
              </div>
              <ListFilter className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Pendentes</p>
                <h3 className="text-2xl font-bold mt-1">{pendingTasks}</h3>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Concluídas</p>
                <h3 className="text-2xl font-bold mt-1">{completedTasks}</h3>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar tarefas..."
                className="pl-10"
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={value => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.priority}
              onValueChange={value => setFilters(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(priorityConfig).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="mt-4 text-muted-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>

        {viewMode === 'board' ? (
          // Board View
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ) : (
          // Table View
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Tarefa</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Data Limite</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => {
                  const status = statusConfig[task.status];
                  const priority = priorityConfig[task.priority];
                  const StatusIcon = status.icon;

                  return (
                    <TableRow key={task.id}>
                      <TableCell>
                        <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={priority.badge}>
                          {priority.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar tarefa</DropdownMenuItem>
                            <DropdownMenuItem>
                              Marcar como {task.status === 'done' ? 'pendente' : 'concluída'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {tasks.length} de {tasks.length} resultados
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
      </Card>
    </div>
  );
} 