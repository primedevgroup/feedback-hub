import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { UserTag } from './user-tag'

export function FeedbackCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Lorem Ipsum</CardTitle>

        <div className="flex items-center gap-2">
          <UserTag>Antony Lajes</UserTag>
          <time className="text-muted" dateTime="2025-06-30T23:42:35.275Z">
            30/06/2025
          </time>
        </div>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet. Et illum enim est aperiam aliquam non quasi
        ipsa. Eum quaerat reprehenderit et libero quia sed dolorem ipsum ut
        velit quibusdam ab veniam recusandae eum velit molestiae. Id accusamus
        eveniet ut voluptatem quia id asperiores pariatur aut adipisci
        aspernatur ut natus ullam aut consequatur commodi est quod dolor! Et
        modi natus At dignissimos necessitatibus aut consectetur aliquam ut
        perspiciatis similique aut eius magnam aut quasi sapiente. Aut
        consequatur quae non laborum voluptatem aut blanditiis facilis?
      </CardContent>
    </Card>
  )
}
