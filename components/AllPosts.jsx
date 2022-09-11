import usePosts from '../lib/queries/usePosts'
import { useQueryClient } from '@tanstack/react-query'
import { fetchData } from '../lib/queries/useBasicQuery'
import axios from 'axios'
import { useState } from 'react'

const AllPosts = ({ setId }) => {
  const { isFetching, isLoading, isError, data, error } = usePosts()
  const queryClient = useQueryClient()
  const [, forceRerender] = useState()
  const handleMouseEnter = async (id) => {
    await queryClient.prefetchQuery(
      ['basic query', { type: 'posts', id }],
      () =>
        axios
          .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((res) => res.data),
      {
        staleTime: 5000,
      },
    )
    console.log(
      queryClient.getQueriesData(['basic query', { type: 'posts', id }])[0][1],
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
                  queryClient.getQueriesData([
                    'basic query',
                    { type: 'posts', id: post.id },
                  ]).length > 0
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
