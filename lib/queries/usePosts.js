import { useQuery } from '@tanstack/react-query'

const usePosts = () => {
  return useQuery(['posts'], () => {
    return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json(),
    )
  })
}

export default usePosts
