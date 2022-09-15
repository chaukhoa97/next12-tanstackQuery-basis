import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const usePaginated = (page) => {
  return useQuery(
    ['paginated', page],
    () =>
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            (page - 1) * 10
          }&limit=10`,
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
    },
  )
}

export default usePaginated
