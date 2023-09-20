import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href="/basic-react-query">Basic React Query</Link>
      <Link href="/paginated">Paginated Query</Link>
      <Link href="/infinite">Infinite Query</Link>
      <Link href="/react-query-with-next">React Query with Next.js</Link>
    </>
  )
}
