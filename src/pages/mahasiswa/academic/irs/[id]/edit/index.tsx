import React from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  return <p>target edited id Irs: {router.query.id}</p>
}
