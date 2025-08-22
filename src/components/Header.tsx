'use client'
import Link from 'next/link';
import Logo from './Logo';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion' 
import { X } from 'lucide-react';
import Menubar from './Menuba';
const Header = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
  return (
		<div className=' md:px-20 pb-3 md:pb-5 flex justify-between items-center shadow-md md:shadow-none p-5  z-50 fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-2xl'>
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
			<Logo />
			<ul className='hidden md:flex items-center gap-x-10'>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/how-it-works'>How it Works</Link>
				</li>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/login'>For Business</Link>
				</li>
				<li className='font-medium text-gray-700  hover:text-blue-700 transition-all duration-300'>
					<Link href='/customers'>For Customers</Link>
				</li>
			</ul>
			<Button
				variant='outline'
				className='hidden md:block font-medium   transition-all duration-300 hover:bg-blue-700 hover:text-white border border-gray-700'
				size='lg'
				onClick={() => router.push('/admin')}
			>
				Try QikLine for Free
			</Button>
			<div onClick={() => setIsOpen(true)} className='md:hidden  p-2 rounded-md cursor-pointer'>
				<Menubar />
			</div>
		</div>
  );
}
const Navbar = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {
	const router = useRouter();
	return (
		<div
			onClick={() => setIsOpen(false)}
			className={`${
				isOpen ? 'block' : 'hidden'
			} bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-screen w-screen flex justify-end`}
		>
			<motion.div
				initial={{
					x: 100,
					opacity: 0.5,
					y: 0,
				}}
				whileInView={{
					x: 0,
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.5,
					ease: 'easeInOut',
					delay: 0.1,
					type: 'spring',
					stiffness: 200,
					damping: 10,
				}}
				exit={{
					x: -100,
					opacity: 0.5,
					y: 10,
				}}
				onClick={(e) => e.stopPropagation()}
				className='w-2/3 p-5 bg-white rounded-l-lg'
			>
				<div className='flex justify-between'>
					<Logo />
					<X
						className='w-5 h-5 text-gray-600'
						onClick={() => setIsOpen(false)}
					/>
				</div>

				<ul className='mt-10 space-y-2 font-medium'>
					<motion.li
						onClick={() => setIsOpen(false)}
						initial={{
							x: 100,
							opacity: 0.5,
							y: 0,
						}}
						whileInView={{
							x: 0,
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
							ease: 'easeInOut',
							delay: 0.2,
							type: 'spring',
							stiffness: 200,
							damping: 10,
						}}
						className='hover:bg-gray-100 p-2 hover:text-blue-700 text-gray-700'
					>
						<Link href='/how-it-works'>How it Works</Link>
					</motion.li>
					<motion.li
						onClick={() => setIsOpen(false)}
						initial={{
							x: 100,
							opacity: 0.5,
							y: 0,
						}}
						whileInView={{
							x: 0,
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
							ease: 'easeInOut',
							delay: 0.4,
							type: 'spring',
							stiffness: 200,
							damping: 10,
						}}
						className='hover:bg-gray-100 p-2 hover:text-blue-700 text-gray-700'
					>
						<Link href='/login'>For Business</Link>
					</motion.li>
					<motion.li
						onClick={() => setIsOpen(false)}
						initial={{
							x: 100,
							opacity: 0.5,
							y: 0,
						}}
						whileInView={{
							x: 0,
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
							ease: 'easeInOut',
							delay: 0.6,
							type: 'spring',
							stiffness: 200,
							damping: 10,
						}}
						className='hover:bg-gray-100 p-2 hover:text-blue-700 text-gray-700'
					>
						<Link href='/customers'>For Customers</Link>
					</motion.li>
				</ul>
				<Button
					variant='outline'
					className='mt-10 font-medium   transition-all duration-300 bg-blue-700 text-white border border-blue-700'
					size='lg'
					onClick={() => router.push('/admin')}
				>
					Try QikLine for Free
				</Button>
			</motion.div>
		</div>
	);
}
export default Header