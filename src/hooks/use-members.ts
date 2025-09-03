import { useQuery } from '@tanstack/react-query'

import { MemberResponse } from '@/@types/member'
import { api } from '@/lib/api'

interface MembersProps {
  squadId: string
}

export function useMembers({ squadId }: MembersProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['members', squadId],
    queryFn: async () => {
      const response = await api.get<{ users: MemberResponse[] }>(
        `/squad/${squadId}/users`,
      )
      return response.data.users.map(user => ({
        ...user,
        createdAt: user.created_at,
      }))
    },
  })

  return { data, isLoading, refetch }
}
