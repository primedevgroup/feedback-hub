export type Member = {
  id: string
  googleId: string
  name: string
  email: string
  createdAt: string
}

export type MemberResponse = Omit<Member, 'createdAt'> & {
  created_at: string
}
