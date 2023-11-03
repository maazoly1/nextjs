import { Metadata } from 'next'
import React from 'react'
import Form from './_components/form'

export default function page() {
  return (
    <main>
      <Form />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'User Profile',
}
