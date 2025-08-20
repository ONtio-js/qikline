import { motion } from 'framer-motion'
import React from 'react'

const HowItWorks = ({icon,title,description,id}:{icon:React.ReactNode,title:string,description:string,id:number}) => {
  return (
    <motion.div initial={{opacity:0,x:id%2===0?-10:10}} whileInView={{opacity:1,x:0}} transition={{duration:0.3,delay:id*0.1}} whileHover={{scale:1.05}} key={id} className='bg-blue-700/80 md:bg-transparent flex flex-col items-center gap-5 md:max-w-[23rem] group hover:bg-blue-600/80 p-10 transition-all duration-500 ease-in-out rounded-2xl'>
        <div className='bg-blue-600/80 group-hover:bg-white group-hover:text-blue-600/80 transition-all duration-500 ease-in-out text-white p-5 rounded-2xl text-2xl'>
            {icon}
        </div>
        <h3 className='text-xl text-white md:text-gray-900 font-semibold group-hover:text-white duration-500 ease-in-out transition-all'>{title}</h3>
        <p className='text-center text-white md:text-gray-700 group-hover:text-white transition-all duration-500 ease-in-out'>{description} </p>
    </motion.div>
  )
}

export default HowItWorks