import usePosts from '../hooks/usePosts'

export async function getStaticProps() {
  return { props: { postId: 1 } }
}

export default function Home({ postId }) {
  const {
    isLoading,
    isError,
    data: post1,
    error,
  } = usePosts({
    postId,
    allow: true,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <div>
      <h3>{JSON.stringify(post1)}</h3>
    </div>
  )
}
