import usePosts from '../hooks/usePosts'
import { useState, useEffect, useCallback, useRef, useContext } from 'react'

export default function Home() {
  const [userId, setuserId] = useState(1)
  const [allow, setallow] = useState(false)
  const { isLoading, isError, data, error } = usePosts({
    userId,
    allow,
  })

  const result = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>Error: {error.message}</p>
    }
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <div>
      <button onClick={() => setuserId((u) => u - 1)}>Minus Id</button>
      <button onClick={() => setuserId((u) => u + 1)}>Plus Id</button>
      <button onClick={() => setallow((a) => !a)}>Toggle Allow</button>
      {result()}
    </div>
  )
}
