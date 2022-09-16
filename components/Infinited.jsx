import { useInfiniteQuery } from '@tanstack/react-query'
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

const Infinited = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['projects'],
    ({ pageParam = 113 }) =>
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            pageParam * 10
          }&limit=10`,
        )
        .then((res) => res.data),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(data?.pageParams[1])
        return lastPage.next
          ? lastPage.next.split('offset=')[1].split('&')[0] / 10
          : null
      },
    },
  )

  return status === 'loading' ? (
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
