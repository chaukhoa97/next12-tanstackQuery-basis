import { useQuery } from '@tanstack/react-query'

const fetchPosts = ({ queryKey }) => {
  const [_key, { userId, allow }] = queryKey
  return allow
    ? fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (res) => res.json(),
      )
    : fetch('https://balapbaxam.com')
}

const usePosts = ({ userId, allow }) => {
  return useQuery([userId, { userId, allow }], fetchPosts)
}

export default usePosts
