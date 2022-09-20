import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const fetchData = ({ queryKey }) => {
  const [_key, { type, id }] = queryKey
  // Query function can be any function that *returns a promise*
  return axios
    .get(`https://jsonplaceholder.typicode.com/${type}/${id}`)
    .then((res) => res.data)
}

const useBasicQuery = (type, id) => {
  const queryClient = useQueryClient()
  return useQuery(['basic query', { type, id }], fetchData, {
    // "Good" data, data that is as good as if it were fetched from the backend
    initialData: () => {
      // Get the data from another query cache if exists
      return queryClient.getQueryData(['posts'])?.find((p) => p.id === id)
    },
    // "Fake-it-till-you-make-it" data
    // placeholderData: () => {
    //   // Get the data from another query cache if exists
    //   return queryClient.getQueryData(['posts'])?.find((p) => p.id === id)
    // },
    staleTime: 3000, // time to take the query from 'fresh' to 'stale', ...
    refetchOnWindowFocus: false, // ... when it's stale, the query will be refetched on window focus
    cacheTime: 10000, // time to keep the `inactive` query in cache
    retry: 1, // number of retries if the query fails
    retryDelay: 1000, // time between retries,
    onSuccess: (data) => {
      console.log('success', data)
    },
    onError: (error) => {
      console.log('error', error)
    },
    // if success -> error will be null; if error -> data will be null
    onSettled: (data, error) => {
      console.log('settled', data, error)
    },
    refetchInterval: 10000, // time between refetches
    refetchIntervalInBackground: true, // refetch even in background when the window is not focused
    select: (data) => {
      // transform the data before returning it
      return { ...data, title: data.title.toUpperCase() }
    },
  })
}

export default useBasicQuery
