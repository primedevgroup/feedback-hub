export type PageData = {
  title: string
  url: string
  icon: React.ReactNode
}

export type Feedback = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  owner_id: string
  target_id: string
  squad_id: string
}
