import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useComment = (id) => {
  return useQuery(['comments', id], () =>
    // Query function with axios
    axios
      .get(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then((res) => res.data),
  )
}

export default useComment
