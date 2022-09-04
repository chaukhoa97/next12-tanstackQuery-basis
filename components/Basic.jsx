import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useId, Fragment } from 'react'
import useBasicQuery from '../lib/queries/useBasicQuery'

const Basic = () => {
  const [type, setType] = useState('posts')
  const [id, setId] = useState(1)
  const { isFetching, isLoading, isError, data, error } = useBasicQuery({
    type,
    id,
  })
  const basicResultId = useId()

  const result = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }
    if (isError) {
      return <p>Error: {error.message}</p>
    }
    return (
      <Fragment key={basicResultId}>
        <h2>User</h2>
        {isFetching ? <p>Fetching...</p> : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Fragment>
    )
  }

  const postsQuery = useQuery(
    ['meo', { postId: id }],
    ({ queryKey }) => {
      const [_key, { postId }] = queryKey
      return axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${postId}`,
      )
    },
    {
      enabled: type === 'users',
    },
  )

  // We can assume by this point that `isSuccess === true`
  return (
    <div>
      <button
        onClick={() => setType((t) => (t == 'posts' ? 'users' : 'posts'))}
      >
        Toggle type
      </button>
      <button onClick={() => setId((i) => i + 1)}>Plus id</button>
      {result()}
      <div>
        <h2>Posts from above User</h2>
        {postsQuery.isLoading ? (
          <p>Change above `type` to "user" to enable this</p>
        ) : (
          <pre>{JSON.stringify(postsQuery.data.data, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}

export default Basic
