'use client'

import { useSentFeedbacks } from '@/hooks/use-feedbacks'
import { FeedbackCard } from '@/components/feedback-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function FeedbackSendedPage() {
  const { data: feedbacks, isLoading, error } = useSentFeedbacks()

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="text-center text-destructive">
          <p>Erro ao carregar feedbacks enviados</p>
        </div>
      </div>
    )
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="text-center text-muted-foreground">
          <p>Nenhum feedback enviado ainda.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  )
}
