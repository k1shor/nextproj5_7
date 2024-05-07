// 'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const profile = () => {
    let params = useParams()
    console.log(params)
  return (
    <div>{params?.name}</div>
  )
}

export default profile