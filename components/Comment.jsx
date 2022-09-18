import { useState, Fragment } from 'react'
import useComment from '../lib/queries/useComment'

const Comment = ({ id }) => {
  const [enabled, setEnabled] = useState(false)
  const { isFetching, isError, data, error } = useComment(id, enabled)

  const result = () => {
    if (isError) {
      return <p>Error: {error.message}</p>
    }
    return (
      <Fragment>
        {isFetching ? <p>Fetching...</p> : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Fragment>
    )
  }

  return (
    <>
      <h2 className="text-3xl text-red-500">comments/{id}</h2>
      <button className="btn btn-info" onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'}
      </button>
      {result()}
    </>
  )
}

export default Comment
