import { useEffect, useState } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const sampleApiReturn = {
  count: 1154,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=1140&limit=10',
  previous: 'https://pokeapi.co/api/v2/pokemon/?offset=1120&limit=10',
  results: [
    {
      name: 'urshifu-single-strike-gmax',
      url: 'https://pokeapi.co/api/v2/pokemon/10226/',
    },
    {
      name: 'urshifu-rapid-strike-gmax',
      url: 'https://pokeapi.co/api/v2/pokemon/10227/',
    },
  ],
}

const Paginated = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ['paginated', page],
      () =>
        axios
          .get(
            `https://pokeapi.co/api/v2/pokemon/?offset=${page * 10}&limit=10`,
          )
          .then((res) => res.data),
      {
        keepPreviousData: true,
      },
    )

  useEffect(() => {
    // Prefetch the next page when page changes
    queryClient.prefetchQuery(['paginated', page + 1], () =>
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            (page + 1) * 10
          }&limit=10`,
        )
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
            setPage((p) => Math.max(p - 1, 0))
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          // Disable if the current page data is still being fetched or if there is no next page (from `sampleApiReturn` above)
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
