import { useState, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import BasicQueryResult from '../components/BasicQueryResult'
import Comment from '../components/Comment'
import AllPosts from '../components/AllPosts'
import AddFormPost from '../components/AddFormPost'
import Link from 'next/link'

export default function Home() {
  const [id, setId] = useState(-1)
  const [type, setType] = useState('posts')
  const idRef = useRef(id)
  const queryClient = useQueryClient()

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
