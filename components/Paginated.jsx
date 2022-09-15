import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import usePaginated from '../lib/queries/usePaginated'
import axios from 'axios'

const Paginated = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    usePaginated(page)

  useEffect(() => {
    queryClient.prefetchQuery(['paginated', page + 1], () =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 10}&limit=10`)
        .then((res) => res.data),
    )
  }, [page, queryClient])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h1 className="text-3xl text-red-500">{page}</h1>
      {data.results.map((result) => (
        <div
          key={result.id}
          className={isPreviousData ? 'text-gray-500' : 'text-white'}
        >
          {result.name}
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!data.previous}
          onClick={() => {
            setPage((p) => Math.max(p - 1, 1))
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          // Disable the Next button if the current page data is still being fetched or if there is no next page
          disabled={isPreviousData || !data.next}
          onClick={() => {
            setPage((p) => p + 1)
          }}
        >
          Next
        </button>
        {isFetching ? (
          <span> The current page data is being fetched...</span>
        ) : null}
      </div>
    </>
  )
}

export default Paginated
