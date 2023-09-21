import Link from 'next/link'
import { useState, useEffect } from 'react'

const PercentageLineLoader = () => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    // Simulate a loading process by increasing the percentage over time
    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage((prevPercentage) => prevPercentage + 1)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [percentage])

  return (
    <div className="relative h-8 w-full bg-gray-300 rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold">
        {percentage}%
      </div>
    </div>
  )
}

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
      <PercentageLineLoader />
    </>
  )
}
