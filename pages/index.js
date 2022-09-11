import { useState, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import BasicQueryResult from '../components/BasicQueryResult'
import Comment from '../components/Comment'
import AllPosts from '../components/AllPosts'

export default function Home() {
  const [id, setId] = useState(-1)
  const [type, setType] = useState('posts')
  const idRef = useRef(id)
  const queryClient = useQueryClient()

  return id === -1 ? (
    <AllPosts setId={setId} />
  ) : (
    <>
      <button className="btn btn-accent block mb-3" onClick={() => setId(-1)}>
        Back
      </button>
      <button
        className="btn btn-secondary block mb-3"
        onClick={() => setType((t) => (t == 'posts' ? 'users' : 'posts'))}
      >
        Toggle type
      </button>
      <label htmlFor="id">ID: </label>
      <input
        className="input input-bordered mb-3"
        id="id"
        onChange={(e) => {
          idRef.current = e.target.value
        }}
      />
      {/* Refetch button */}
      <button
        className="btn btn-primary ml-3"
        onClick={() => setId(idRef.current)}
      >
        Refetch based on input
      </button>
      <button
        className="btn btn-secondary btn-outline ml-3"
        onClick={() => {
          queryClient.invalidateQueries(['basic query', { type, id }])
        }}
      >
        Refetch "Basic Query" using invalidate
      </button>
      <BasicQueryResult id={id} type={type} />
      <Comment id={id} />
    </>
  )
}
