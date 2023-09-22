import Link from 'next/link'

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  // Chỉ pre-render 5 post đầu
  const paths = posts.slice(0, 5).map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Home({ posts }) {
  return posts.map((post) => (
    <div key={post.id}>
      {/* <Link href={`/${post.id}`}>
          {post.id}. {post.title}
      </Link> */}
      <a href={`/${post.id}`}>
        {post.id}. {post.title}
      </a>
    </div>
  ))
}
