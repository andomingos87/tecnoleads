'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metricas = {
  totalLeads: 655,
  leadsAtivos: 423,
  taxaConversao: "32%",
  ticketMedio: "R$ 1.250,00"
}

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metricas.totalLeads}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metricas.leadsAtivos}</div>
          <p className="text-xs text-muted-foreground">
            64.5% do total de leads
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metricas.taxaConversao}</div>
          <p className="text-xs text-muted-foreground">
            +4.1% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metricas.ticketMedio}</div>
          <p className="text-xs text-muted-foreground">
            +12.5% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 