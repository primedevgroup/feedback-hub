import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Feedback } from '@/@types/defaults'

export function useReceivedFeedbacks() {
  return useQuery({
    queryKey: ['feedbacks', 'received'],
    queryFn: async (): Promise<Feedback[]> => {
      const response = await api.get('/feedbacks/received')
      return response.data
    },
  })
}

export function useSentFeedbacks() {
  return useQuery({
    queryKey: ['feedbacks', 'sent'],
    queryFn: async (): Promise<Feedback[]> => {
      const response = await api.get('/feedbacks/sent')
      return response.data
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