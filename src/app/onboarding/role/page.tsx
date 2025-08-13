'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Page = () => {
	const [role, setRole] = useState('');
	// const [active,setActive] = useState(false);
	const router = useRouter();

	const handleSelection = (role: string) => {
		setRole(role);
		// setActive(true);
	};

	const handleContinue = () => {
		if (role == 'user') {
			router.push('/customers');
		} else if (role == 'business') {
			router.push('/admin');
		}
	};

	return (
		<div className='h-screen w-screen bg-white pt-20 flex flex-col items-center text-gray-700'>
			<motion.div
				className='flex items-center justify-center  rounded-lg bg-blue-700/20 p-5  '
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 100 }}
				transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
				viewport={{ once: true, amount: 0.5 }}
			>
				<div className='w-[400px] h-[350px]   flex items-center justify-start  p-4 bg-white  rounded-lg relative '>
					<Image
						src={'/onboarding/role.webp'}
						width={300}
						height={300}
						className='h-full w-full  object-cover object- rounded-lg '
						alt=''
					/>
				</div>
			</motion.div>
			<div className='mt-5 flex flex-col items-center gap-5 '>
				<div className='space-y-2'>
					<h2 className='text-black text-2xl font-semibold'>
						Are you a business or a customer?
					</h2>
					<p className='text-gray-500  text-center'>
						Choose how you&apos;d like to use QikLine today.
					</p>
				</div>
				<ul className='w-[500px] border border-gray-100 rounded-2xl p-7 space-y-6'>
					<li
						className={`${
							role == 'user' ? 'bg-blue-700/10 rounded-md' : ''
						} transition-all duration-500 ease-in-out flex items-start gap-x-4 p-2`}
						onClick={() => handleSelection('user')}
					>
						<User2
							color='blue'
							size={24}
						/>
						<div>
							<h3 className='text-black font-medium text-lg'>
								I&apos;m a customer
							</h3>
							<p className='text-sm'>
								&quot;Find services and book appointments&quot;
							</p>
						</div>
					</li>
					<li
						className={`${
							role == 'business'
								? 'bg-blue-700/10 rounded-md'
								: ''
						} transition-all duration-500 ease-in-out flex items-start gap-x-4 p-2`}
						onClick={() => handleSelection('business')}
					>
						<Image
							src={'/onboarding/bank.svg'}
							width={24}
							height={24}
							alt=''
						/>
						<div>
							<h3 className='text-black font-medium text-lg'>
								I&apos;m a business
							</h3>
							<p className='text-sm'>
								&quot;List services and manage bookings&quot;
							</p>
						</div>
					</li>
				</ul>
				<button
					className={`${
						role == '' ? 'bg-blue-700/50' : 'bg-blue-700'
					} w-[300px] mt-5 capitalize text-center text-2xl font-[600] py-3 text-white rounded-xl`}
					onClick={handleContinue}
				>
					continue
				</button>
			</div>
		</div>
	);
};

export default Page;
