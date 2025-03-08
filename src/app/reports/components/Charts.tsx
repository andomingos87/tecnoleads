'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

// Dados mockados para os gráficos
const leadsByMonth = [
  { name: 'Jan', leads: 65 },
  { name: 'Fev', leads: 78 },
  { name: 'Mar', leads: 92 },
  { name: 'Abr', leads: 85 },
  { name: 'Mai', leads: 110 },
  { name: 'Jun', leads: 125 },
]

const conversionData = [
  { name: 'Jan', taxa: 25 },
  { name: 'Fev', taxa: 28 },
  { name: 'Mar', taxa: 32 },
  { name: 'Abr', taxa: 35 },
  { name: 'Mai', taxa: 38 },
  { name: 'Jun', taxa: 42 },
]

export function Charts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Leads por Mês</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Taxa de Conversão (%)</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="taxa" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
} 