import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const AllPosts = ({ setId }) => {
  const { isFetching, isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      // Query function with `fetch`: Must check for `ok` status because `fetch` doesn't throw errors
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json()
    },
  })

  const queryClient = useQueryClient()
  const [, forceRerender] = useState()

  const handleMouseEnterPost = async (id) => {
    // Comment this to test `initialData` in useBasicQuery.ts
    // await queryClient.prefetchQuery(
    //   ['basic query', { type: 'posts', id }],
    //   () =>
    //     axios
    //       .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //       .then((res) => res.data),
    // )
    console.log(
      queryClient.getQueryData(['basic query', { type: 'posts', id }]),
    )
    forceRerender({} as any)
  }

  const result = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }
    if (isError) {
      return <p>Error: {error.message}</p>
    }
    return (
      <div>
        <h2 className="text-3xl text-red-500">All posts</h2>
        {isFetching ? <p>Fetching...</p> : null}
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <button
                onClick={() => setId(post.id)}
                className={`btn btn-link ${
                  queryClient.getQueryData([
                    'basic query',
                    { type: 'posts', id: post.id },
                  ])
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
                onMouseEnter={() => handleMouseEnterPost(post.id)}
              >
                {post.id}. {post.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return result()
}

export default AllPosts
