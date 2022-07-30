import { useQuery } from '@tanstack/react-query'

const fetchPosts = ({ queryKey }) => {
  const [_key, { postId, allow }] = queryKey
  return allow
    ? fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
        (res) => res.json(),
      )
    : 'Not allowed to fetch'
}

const usePosts = ({ postId, allow }) => {
  return useQuery([postId, { postId, allow }], fetchPosts)
}

export default usePosts
