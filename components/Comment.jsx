import { useState, Fragment } from 'react'
import useComment from '../lib/queries/useComment'

const Comment = ({ id }) => {
  const { isFetching, isLoading, isError, data, error } = useComment(id)

  const result = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }
    if (isError) {
      return <p>Error: {error.message}</p>
    }
    return (
      <Fragment>
        <h2 className="text-3xl text-red-500">comments/{id}</h2>
        {isFetching ? <p>Fetching...</p> : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Fragment>
    )
  }

  return result()
}

export default Comment
