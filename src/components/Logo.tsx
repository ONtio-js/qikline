import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='text-black font-semibold text-3xl md:text-4xl'>
            Q<span className='text-blue-700'>ik</span>Line
    </Link>
  )
}

export default Logo