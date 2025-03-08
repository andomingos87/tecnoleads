'use client';

import React, { useState } from 'react';
import { 
  Filter, 
  MoreHorizontal, 
  DollarSign, 
  Plus, 
  Calendar, 
  Building2, 
  LayoutGrid, 
  List,
  Search,
  X,
  ArrowUpDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const deals = [
  {
    id: 1,
    title: 'Projeto E-commerce',
    company: 'Tech Corp',
    value: 50000,
    stage: 'quote',
    contact: 'Maria Silva',
    dueDate: '2024-03-20',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Consultoria TI',
    company: 'Data Systems',
    value: 30000,
    stage: 'followup',
    contact: 'João Santos',
    dueDate: '2024-03-15',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Sistema ERP',
    company: 'Smart Solutions',
    value: 100000,
    stage: 'negotiation',
    contact: 'Ana Oliveira',
    dueDate: '2024-03-25',
    priority: 'high'
  },
  {
    id: 4,
    title: 'App Mobile',
    company: 'Digital Inc',
    value: 75000,
    stage: 'won',
    contact: 'Pedro Santos',
    dueDate: '2024-03-10',
    priority: 'medium'
  }
];

const stages = [
  { 
    id: 'quote', 
    label: 'Orçamento', 
    color: 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-100',
    headerColor: 'text-blue-700',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  { 
    id: 'followup', 
    label: 'Follow-up', 
    color: 'bg-purple-50/50 hover:bg-purple-50/80 border-purple-100',
    headerColor: 'text-purple-700',
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  { 
    id: 'negotiation', 
    label: 'Negociação', 
    color: 'bg-yellow-50/50 hover:bg-yellow-50/80 border-yellow-100',
    headerColor: 'text-yellow-700',
    badgeColor: 'bg-yellow-100 text-yellow-700'
  },
  { 
    id: 'won', 
    label: 'Ganho', 
    color: 'bg-green-50/50 hover:bg-green-50/80 border-green-100',
    headerColor: 'text-green-700',
    badgeColor: 'bg-green-100 text-green-700'
  },
  { 
    id: 'lost', 
    label: 'Perdido', 
    color: 'bg-red-50/50 hover:bg-red-50/80 border-red-100',
    headerColor: 'text-red-700',
    badgeColor: 'bg-red-100 text-red-700'
  }
];

type ViewMode = 'kanban' | 'list';

export default function BusinessPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [filters, setFilters] = useState({
    search: '',
    stage: '',
    priority: ''
  });
  const totalValue = deals.reduce((acc, deal) => acc + deal.value, 0);
  const totalDeals = deals.length;

  // Verifica se há algum filtro ativo
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleClearFilters = () => {
    setFilters({
      search: '',
      stage: '',
      priority: ''
    });
  };

  const DealCard = ({ deal, stage }: { deal: typeof deals[0], stage: typeof stages[0] }) => (
    <Card 
      className={`group cursor-pointer hover:shadow-md transition-all duration-200 ${stage.color}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1 mr-2">
            <h4 className="font-medium truncate mb-1">{deal.title}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{deal.company}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar negócio</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <DollarSign className="w-4 h-4 shrink-0" />
          <span className="truncate font-medium">
            {deal.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {new Date(deal.dueDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <Badge 
            variant="outline" 
            className="shrink-0 group-hover:bg-background transition-colors"
          >
            {deal.contact}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Negócios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie seus negócios e acompanhe o progresso das negociações
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
            Novo Negócio
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar negócios..."
                className="pl-10"
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div>
              <Select
                value={filters.stage}
                onValueChange={value => setFilters(prev => ({ ...prev, stage: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={filters.priority}
                onValueChange={value => setFilters(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="h-9 text-base gap-2 px-4">
                <DollarSign className="w-4 h-4" />
                {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Badge>
              <Badge variant="outline" className="h-9 text-base">
                {totalDeals} negócios ativos
              </Badge>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {viewMode === 'kanban' ? (
          // Kanban View
          <div className="relative">
            <div className="absolute inset-0">
              <div className="h-full overflow-x-auto">
                <div className="min-w-[1024px] p-4">
                  <div className="grid grid-cols-5 gap-4">
                    {stages.map((stage) => (
                      <div key={stage.id} className="w-full">
                        <Card className={`mb-4 border ${stage.color}`}>
                          <CardHeader className="py-3">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium ${stage.headerColor}`}>{stage.label}</h3>
                              <Badge className={stage.badgeColor}>
                                {deals.filter(deal => deal.stage === stage.id).length}
                              </Badge>
                            </div>
                          </CardHeader>
                        </Card>

                        <div className="space-y-3">
                          {deals
                            .filter(deal => deal.stage === stage.id)
                            .map(deal => (
                              <DealCard key={deal.id} deal={deal} stage={stage} />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[calc(100vh-16rem)]" />
          </div>
        ) : (
          // List View
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Negócio</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2 cursor-pointer">
                        Valor
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2 cursor-pointer">
                        Data Limite
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map(deal => {
                    const stage = stages.find(s => s.id === deal.stage)!;
                    return (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">{deal.title}</TableCell>
                        <TableCell>{deal.company}</TableCell>
                        <TableCell>
                          {deal.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell>
                          <Badge className={stage.badgeColor}>
                            {stage.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{deal.contact}</TableCell>
                        <TableCell>{new Date(deal.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar negócio</DropdownMenuItem>
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

            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {deals.length} de {deals.length} resultados
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
        )}
      </div>
    </div>
  );
} 