
import React from 'react'

const Title = ({title,description}:{title?:string,description?:string}) => {
  return (
    <div className='max-w-4xl mx-auto space-y-2 flex flex-col items-center'>
        <h2 className='text-3xl font-semibold text-center capitalize'>{title}</h2>
        <p className='max-w-[36rem] text-center text-lg text-gray-700'>{description}</p>
    </div>
  )
}

export default Title