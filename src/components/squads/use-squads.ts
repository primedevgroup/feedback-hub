import { useQuery } from '@tanstack/react-query'

import { ApiSquadResponse } from './squads.types'

import { api } from '@/lib/api'

export function useSquads() {
  const {
    data: squads,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['squads'],
    queryFn: async () => {
      const response = await api.get<{ squads: ApiSquadResponse[] }>(
        '/squad/find-by-user',
      )
      return response.data.squads.map(squad => ({
        ...squad,
        createdAt: new Date(squad.created_at).toISOString(),
        membersCount: squad.members_count,
      }))
    },
  })

  return {
    squads,
    isLoading,
    refetchSquads: refetch,
  }
}
