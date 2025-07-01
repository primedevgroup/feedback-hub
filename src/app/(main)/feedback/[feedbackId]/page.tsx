export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ feedbackId: string }>
}) {
  const { feedbackId } = await params

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-3xl font-bold">{feedbackId}</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem rerum,
        necessitatibus maxime praesentium repellat, voluptatum quibusdam fugit
        at enim quas illum neque iste atque commodi maiores qui sed sequi
        voluptatem.
      </p>
    </div>
  )
}
