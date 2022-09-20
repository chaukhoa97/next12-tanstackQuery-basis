import Link from 'next/link'
import { trpc } from '../lib/utils/trpc'

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'meo' })
  if (!hello.data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <p>{hello.data.greeting}</p>
      </div>
      <Link href="/basic-react-query">
        <a className="link link-primary block">Basic React Query</a>
      </Link>
      <Link href="/paginated">
        <a className="link link-primary block">Paginated Query</a>
      </Link>
      <Link href="/infinite">
        <a className="link link-primary block">Infinite Query</a>
      </Link>
      <Link href="/react-query-with-next">
        <a className="link link-primary block">React Query with Next.js</a>
      </Link>
    </>
  )
}
