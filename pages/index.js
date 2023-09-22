import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link className="block" href="/basic-react-query">
        Basic React Query
      </Link>
      <Link className="block" href="/paginated">
        Paginated Query
      </Link>
      <Link className="block" href="/infinite">
        Infinite Query
      </Link>
      <Link className="block" href="/react-query-with-next">
        React Query with Next.js
      </Link>
    </>
  )
}
