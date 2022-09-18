import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useComment = (id, enabled) => {
  return useQuery(
    ['comments', id],
    () =>
      // Query function with axios
      axios
        .get(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then((res) => res.data),
    {
      enabled, // Dependent/Lazy Queries
    },
  )
}

export default useComment
