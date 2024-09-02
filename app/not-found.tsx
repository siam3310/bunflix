import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Not Found 404 - Nextflix',
  description: 'Nextflix clone built with Next.js and Tailwind CSS',
}

export default function NotFound () {
  return (
    <div className='h-screen text-center w-full flex item-center justify-center flex-col bg-black/70'>
      <h1 className=' text-2xl lg:text-8xl'>404 Not Found</h1>
      <p className='capitalize opacity-70  text-lg'>the resourse your looking for does not exist</p>
      <p>Go Back <Link href={'/'} className='underline uppercase '>Home</Link></p>
    </div>
  )
}

