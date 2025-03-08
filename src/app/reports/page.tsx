import { Metadata } from "next"
import { Charts } from "./components/Charts"
import { MetricCards } from "./components/MetricCards"

export const metadata: Metadata = {
  title: "Relatórios | TecnoLeads",
  description: "Página de relatórios e análises",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">
            Acompanhe suas métricas e resultados
          </p>
        </div>
      </div>

      <MetricCards />
      <Charts />
    </div>
  )
} 