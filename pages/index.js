import Link from 'next/link'

export default function Home() {
  return (
    <>
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
