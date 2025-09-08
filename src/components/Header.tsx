'use client';
import Link from 'next/link';
import Logo from './Logo';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {  User2Icon, X } from 'lucide-react';
import Menubar from './Menuba';
import TrackingLanding from './tracking/TrackingLanding';
import { authService } from '@/services/auth';
const Header = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isTrackingOpen, setIsTrackingOpen] = useState(false);
	const pathname = usePathname();
	return (
		<div className=' md:px-20 pb-3 md:pb-5 flex justify-between items-center shadow-md md:shadow-none p-5  z-50 fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-2xl'>
			<Navbar
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsTrackingOpen={setIsTrackingOpen}
			/>
			<TrackingLanding
				isOpen={isTrackingOpen}
				onClose={() => setIsTrackingOpen(false)}
			/>
			<Logo />
			<ul className='hidden md:flex items-center gap-x-10'>
				<li
					className={`${
						pathname.includes('businesses')
							? 'text-blue-700 font-semibold border-b-2 pb-2 border-blue-700'
							: ''
					} font-medium text-gray-700 hover:text-blue-700 transition-all duration-300`}
				>
					<Link
						href='/businesses'
						className={`${
							pathname.includes('businesses')
								? 'text-blue-800'
								: ''
						}`}
					>
						Explore Businesses
					</Link>
				</li>
				<li
					className={`${
						pathname.includes('how-it-works')
							? 'text-blue-700 font-semibold border-b-2 pb-2 border-blue-700'
							: ''
					} font-medium text-gray-700 hover:text-blue-700 transition-all duration-300`}
				>
					<Link
						className={`${
							pathname.includes('how-it-works')
								? 'text-blue-800'
								: ''
						}`}
						href='/#how-it-works'
					>
						How it works
					</Link>
				</li>
				<li className='font-medium text-gray-700  hover:text-blue-700 transition-all duration-300'>
					<div
						onClick={() => setIsTrackingOpen(true)}
						className='cursor-pointer'
					>
						Track Booking
					</div>
				</li>
			</ul>
			<Button
				variant='outline'
				className='hidden md:block font-medium border-none  transition-all duration-300 bg-blue-700 hover:bg-blue-800 text-white  h-12 cursor-pointer hover:text-white'
				size='lg'
				onClick={() => router.push('/admin')}
			>
				{authService.isAuthenticated()
					? <p className='flex items-center gap-x-2'><User2Icon className='w-5 h-5' /> Dashboard</p>
					:  'Register Your Business'}
			</Button>
			<div
				onClick={() => setIsOpen(true)}
				className='md:hidden  p-2 rounded-md cursor-pointer'
			>
				<Menubar />
			</div>
		</div>
	);
};
const Navbar = ({
	isOpen,
	setIsOpen,
	setIsTrackingOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setIsTrackingOpen: (isTrackingOpen: boolean) => void;
}) => {
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
						<Link href='/businesses'>Explore Businesses</Link>
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
						<Link href='/#how-it-works'>How it Works</Link>
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
						<div
							onClick={() => setIsTrackingOpen(true)}
							className='cursor-pointer'
						>
							Track Your Booking
						</div>
					</motion.li>
				</ul>
				<Button
					variant='outline'
					className='mt-10 font-medium hover:text-white  transition-all duration-300 bg-blue-700 text-white border border-blue-700 cursor-pointer hover:bg-blue-800 hover:border-blue-800'
					size='lg'
					onClick={() => router.push('/admin')}
				>
					{authService.isAuthenticated() ? <p className='flex items-center gap-x-2'><User2Icon className='w-5 h-5' /> Dashboard</p> : 'Register Your Business'}
				</Button>
			</motion.div>
		</div>
	);
};
export default Header;
