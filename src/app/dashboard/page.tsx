'use client';

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  ShoppingCart,
  TrendingUp,
  Calendar,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusCards = [
  {
    title: 'Leads Novos',
    value: '45',
    description: 'No período',
    trend: '+20%',
    trendUp: true,
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Orçamentos',
    value: '28',
    description: 'Em análise',
    trend: '+5%',
    trendUp: true,
    icon: FileText,
    color: 'yellow'
  },
  {
    title: 'Vendas',
    value: 'R$ 150K',
    description: 'Total período',
    trend: '+15%',
    trendUp: true,
    icon: ShoppingCart,
    color: 'green'
  },
  {
    title: 'Conversão',
    value: '32%',
    description: 'Lead → Venda',
    trend: '+3%',
    trendUp: true,
    icon: TrendingUp,
    color: 'purple'
  }
];

export default function DashboardPage() {
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState<'vencidas' | 'proximas'>('vencidas');

  const tasks = {
    vencidas: [
      { title: 'Follow-up Cliente A', deadline: '2 dias atraso', priority: 'Alta' },
      { title: 'Proposta Cliente B', deadline: '1 dia atraso', priority: 'Média' },
      { title: 'Orçamento Cliente C', deadline: '3 dias atraso', priority: 'Alta' },
    ],
    proximas: [
      { title: 'Reunião Cliente D', deadline: 'Hoje, 15:00', priority: 'Alta' },
      { title: 'Apresentação Cliente E', deadline: 'Amanhã, 10:00', priority: 'Alta' },
      { title: 'Call Cliente F', deadline: 'Em 2 dias', priority: 'Média' },
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header with Period Filter */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Análise de desempenho e acompanhamento</p>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="15">Últimos 15 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Último trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => (
          <div 
            key={index} 
            className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold mt-2 text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                <card.icon className={`w-5 h-5 text-${card.color}-500`} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className={`flex items-center gap-1 text-sm ${
                card.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${card.trendUp ? '' : 'rotate-180'}`} />
                <span>{card.trend}</span>
              </div>
              <span className="text-sm text-gray-500">{card.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks and Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Acompanhamento de Tarefas</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todas</button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('vencidas')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'vencidas'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Vencidas
            </button>
            <button
              onClick={() => setActiveTab('proximas')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'proximas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              Próximas
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks[activeTab].map((task, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  activeTab === 'vencidas' ? 'bg-red-50' : 'bg-gray-50'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className={`text-sm ${
                    activeTab === 'vencidas' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {task.deadline}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'Alta' 
                    ? activeTab === 'vencidas'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Comparativo de Desempenho</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Período Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-600">Período Anterior</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Área reservada para o gráfico de comparação
          </div>
        </div>
      </div>
    </div>
  );
} 