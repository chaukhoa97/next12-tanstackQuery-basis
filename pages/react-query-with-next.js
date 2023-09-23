import { useQuery } from '@tanstack/react-query'

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}

export default function Bla({ posts }) {
  // Có sẵn data lúc pre-render, vào xong sẽ refetch lại một lần nữa
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json(),
      ),
    initialData: posts,
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <p className="text-2xl">{isFetching && 'Fetching...'}</p>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
