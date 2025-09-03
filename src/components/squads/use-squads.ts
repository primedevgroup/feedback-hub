import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { SquadData } from './squad-schemas'
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

  function getSquadById(squadId: string) {
    return squads?.find(squad => squad.id === squadId)
  }

  async function updateSquad(squadId: string, data: SquadData) {
    try {
      const response = await api.put(`/squad/${squadId}/update`, data)
      toast.success('Squad updated successfully!')
      refetch()
      return response
    } catch (error) {
      console.error('Error updating squad:', error)
      toast.error('Error updating squad. Try again.')
    }
  }

  return {
    squads,
    isLoading,
    refetchSquads: refetch,
    getSquadById,
    updateSquad,
  }
}
