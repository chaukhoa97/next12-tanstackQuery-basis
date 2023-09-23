import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// queryFn can be any function that *returns a promise*
export const fetchData = ({ queryKey }) => {
  // Access the key, status and page variables in your query function
  const [_key, { type, id }] = queryKey
  return axios
    .get(`https://jsonplaceholder.typicode.com/${type}/${id}`)
    .then((res) => res.data)
}

const useBasicQuery = (type, id) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['basic query', { type, id }],
    queryFn: fetchData,
    // "Good" data, data that is as good as if it were fetched from the backend
    //! This won't work together with `prefetchQuery` in AllPost.jsx because they have the same purpose
    //! Read more in https://tanstack.com/query/v4/docs/guides/initial-query-data
    initialData: () => {
      // Get the data from another query cache if exists
      return queryClient
        .getQueryData<any[]>(['posts'])
        ?.find((p) => p.id === id)
    },
    // "Fake-it-till-you-make-it" data
    placeholderData: {
      id,
      title: 'Placeholder title',
      body: 'Placeholder body',
    },
    // staleTime: 3000, // time to take the query from 'fresh' to 'stale', ...
    refetchOnWindowFocus: false, // ... when it's stale, the query will be refetched on window focus
    gcTime: 10000, // time to keep the `inactive` query in cache
    retry: 1, // number of retries if the query fails
    retryDelay: 1000, // time between retries,
    enabled: true, // Dependent/Lazy Queries
    refetchInterval: 10000, // time between refetches
    refetchIntervalInBackground: true, // refetch even in background when the window is not focused
    select: (data) => {
      // transform the data before returning it
      return { ...data, title: data.title.toUpperCase() }
    },
  })
}

export default useBasicQuery
