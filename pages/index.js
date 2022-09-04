import { useState } from 'react'
import Basic from '../components/Basic'

export default function Home() {
  const [showBasic, setShowBasic] = useState(true)

  return (
    <div>
      <button onClick={() => setShowBasic(!showBasic)}>
        Toggle Show Basic
      </button>
      {showBasic && <Basic />}
    </div>
  )
}
