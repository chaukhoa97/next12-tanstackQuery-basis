import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const AllPosts = ({ setId }) => {
  const { isFetching, isLoading, isError, data, error } = useQuery(
    ['posts'],
    () =>
      // Query function with `fetch`
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json(),
      ),
  )
  const queryClient = useQueryClient()
  const [, forceRerender] = useState()
  const handleMouseEnter = async (id) => {
    // Comment this to test `initialData` in useBasicQuery.js
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
    forceRerender({})
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
                onMouseEnter={() => handleMouseEnter(post.id)}
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
