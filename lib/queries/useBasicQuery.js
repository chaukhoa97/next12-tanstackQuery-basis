import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = ({ queryKey }) => {
  const [_key, { type, id }] = queryKey
  return axios
    .get(`https://jsonplaceholder.typicode.com/${type}/${id}`)
    .then((res) => res.data)
}

const useBasicQuery = ({ type, id }) => {
  return useQuery([type, { type, id }], fetchData, {
    initialData: { title: 'Initial Data' },
    // time to take the query from 'fresh' to 'stale', when it's stale the query will be refetched on window focus
    staleTime: 3000,
    // refetchOnWindowFocus: false,
    cacheTime: 10000, // time to keep the `inactive` query in cache
    retry: 1, // number of retries if the query fails
    retryDelay: 1000, // time between retries
  })
}

export default useBasicQuery
