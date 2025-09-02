import { ArrowDown, ArrowUp, Users } from 'lucide-react'

import { BarChartDashboard } from '@/components/bar-chart-dashboard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface DashboardPageProps {
  params: {
    squadId: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { squadId } = params
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full gap-4">
        <Card className="from-gradient to-background flex-1 bg-linear-to-br to-80%">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-3xl">10</CardTitle>
            <ArrowDown />
          </CardHeader>
          <CardContent>
            <CardDescription>Feedbacks received</CardDescription>
          </CardContent>
        </Card>
        <Card className="from-gradient to-background flex-1 bg-linear-to-br to-80%">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-3xl">6</CardTitle>
            <ArrowUp />
          </CardHeader>
          <CardContent>
            <CardDescription>Feedbacks sended</CardDescription>
          </CardContent>
        </Card>
        <Card className="from-gradient to-background flex-1 bg-linear-to-br to-80%">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-3xl">7</CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <CardDescription>Different people</CardDescription>
          </CardContent>
        </Card>
      </div>

      <BarChartDashboard />
    </div>
  )
}
