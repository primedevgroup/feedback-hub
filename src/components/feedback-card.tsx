import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { UserTag } from './user-tag'
import { Feedback } from '@/@types/defaults'

interface FeedbackCardProps {
  feedback: Feedback
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <Link href={`/feedback/${feedback.id}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{feedback.title}</CardTitle>

          <div className="flex items-center gap-2">
            <UserTag>Usuário</UserTag>
            <time className="text-muted" dateTime={feedback.created_at}>
              {formatDate(feedback.created_at)}
            </time>
          </div>
        </CardHeader>
        <CardContent>
          {feedback.content}
        </CardContent>
      </Card>
    </Link>
  )
}
