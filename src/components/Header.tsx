'use client'
import Link from 'next/link';
import Logo from './Logo';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { MenuIcon } from 'lucide-react';

const Header = () => {
	const router = useRouter();
  return (
		<div className=' md:px-20 pb-5 flex justify-between items-center shadow-md p-5 rounded-lg'>
			<Logo />
			<ul className='hidden md:flex items-center gap-x-10'>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>How it Works</Link>
				</li>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>For Business</Link>
				</li>
				<li className='font-medium text-gray-700  hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>For Customers</Link>
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
			<div className='md:hidden hover:bg-gradient-to-t from-purple-600 to-purple-300'>
				<MenuIcon />
			</div>
		</div>
  );
}

export default Header