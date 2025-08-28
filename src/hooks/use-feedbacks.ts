import { useQuery } from '@tanstack/react-query'

import { Feedback } from '@/@types/defaults'
import { api } from '@/lib/api'

export function useReceivedFeedbacks() {
  return useQuery({
    queryKey: ['feedbacks', 'received'],
    queryFn: async (): Promise<Feedback[]> => {
      const response = await api.get<{ feedbacks: Feedback[] }>(
        '/feedback/received',
      )
      return response.data.feedbacks
    },
  })
}

export function useSentFeedbacks() {
  return useQuery({
    queryKey: ['feedbacks', 'sent'],
    queryFn: async (): Promise<Feedback[]> => {
      const response = await api.get<{ feedbacks: Feedback[] }>(
        '/feedback/sent',
      )
      return response.data.feedbacks
    },
  })
}

export function useFeedbackById(id: string) {
  return useQuery({
    queryKey: ['feedback', id],
    queryFn: async (): Promise<Feedback> => {
      const response = await api.get(`/feedbacks/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
