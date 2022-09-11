import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const fetchData = ({ queryKey }) => {
  const [_key, { type, id }] = queryKey
  return axios
    .get(`https://jsonplaceholder.typicode.com/${type}/${id}`)
    .then((res) => res.data)
}

const useBasicQuery = (type, id) => {
  return useQuery(['basic query', { type, id }], fetchData, {
    // initialData: { title: 'Initial Data' },
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
  })
}

export default useBasicQuery
