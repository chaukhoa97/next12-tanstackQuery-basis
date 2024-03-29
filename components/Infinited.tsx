import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const Infinited = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) =>
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            pageParam * 10
          }&limit=10`,
        )
        .then((res) => res.data),
    initialPageParam: 113,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next
        ? lastPage.next.split('offset=')[1].split('&')[0] / 10
        : null
    },
  })

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, index) => (
        <div key={index}>
          {page.results.map((result, index) => (
            <div key={index}>
              {index}. {result.name}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
      <div>{isFetching && 'Fetching...'}</div>
    </>
  )
}

export default Infinited
