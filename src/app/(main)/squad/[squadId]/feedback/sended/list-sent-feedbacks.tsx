'use client'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useSentFeedbacks } from '@/hooks/use-feedbacks'

export function ListSentFeedbacks() {
  const { data: feedbacks, isLoading, error } = useSentFeedbacks()

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        {[1, 2, 3].map(i => (
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
        <div className="text-destructive text-center">
          <p>Error loading sent feedbacks</p>
        </div>
      </div>
    )
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="text-muted-foreground text-center">
          <p>No sent feedbacks yet.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {feedbacks?.map(({ id, content, title, created_at }) => (
        <Link key={id} href={`/feedback/${id}`}>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{title}</CardTitle>

              <div className="flex items-center gap-2">
                <time
                  className="text-muted-foreground"
                  dateTime={created_at}
                >
                  {new Date(created_at).toLocaleDateString('pt-BR')}
                </time>
              </div>
            </CardHeader>
            <CardContent>
              {content}
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}
