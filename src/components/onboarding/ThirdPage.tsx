import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { Clock, Edit } from 'lucide-react';
const ThirdPage = () => {
    	const containerVariants = {
			hidden: { opacity: 0, x: -50 },
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.5,
					ease: 'easeOut',
				},
			},
		};
  return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={containerVariants}
			className='pt-10 flex flex-col items-center'
		>
			<motion.div
				className='flex items-center justify-center  rounded-lg bg-blue-700/20 p-5  '
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 100 }}
				transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
				viewport={{ once: true, amount: 0.5 }}
			>
				<div className='w-[300px] h-[350px]   flex items-center justify-start  p-4 bg-white  rounded-lg relative '>
					<Image
						src={'/onboarding/third.webp'}
						width={300}
						height={300}
						className='h-full w-full  object-cover object-top-right rounded-lg '
						alt=''
					/>
					<motion.div
						className='absolute bottom-8  -right-70 bg-white rounded-md p-2 shadow-md min-w-[300px] '
						initial={{ opacity: 0, y: 100, x: 100 }}
						whileInView={{ opacity: 1, x: 0, y: 0 }}
						exit={{ opacity: 0, y: 100, x: 100 }}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
							delay: 0.3,
							type: 'spring',
							stiffness: 100,
						}}
						viewport={{ once: true, amount: 0.5 }}
					>
						<div className='flex items-center gap-x-1'>
							<div className='bg-emerald-600 rounded-full p-1 animate-pulse'>
								<div className='bg-white rounded-full'>
									<MdOutlineCheckCircle className='text-emerald-600 text-xl ' />
								</div>
							</div>
							<p className='text-sm text-gray-700 font-semibold'>
								Booked
							</p>
						</div>
						<div className='flex items-center justify-between mt-2'>
							<div className='flex items-center gap-x-2'>
								<Image
									src={'/onboarding/second.webp'}
									width={100}
									height={100}
									className='h-8 w-8  object-cover object-top-right rounded-lg '
									alt=''
								/>
								<div className='flex flex-col'>
									<h4 className='text-sm font-semibold'>
										body releaxation therapy
									</h4>
									<p className='text-xs text-gray-500'>
										4:50 PM
									</p>
								</div>
							</div>
							<div className='flex items-center gap-x-2'>
								<Edit className='text-blue-700 size-4 font-semibold' />
								<Clock className='text-blue-700 size-4 font-semibold' />
							</div>
						</div>
					</motion.div>
					<motion.div
						className='absolute bottom-64 -right-58 bg-white rounded-md p-2 shadow-md min-w-[300px] mt-2'
						initial={{ opacity: 0, y: 100, x: 100 }}
						whileInView={{ opacity: 1, x: 0, y: 0 }}
						exit={{ opacity: 0, y: 100, x: 100 }}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
							delay: 0.25,
							type: 'spring',
							stiffness: 100,
						}}
						viewport={{ once: true, amount: 0.5 }}
					>
						<div className='flex items-center gap-x-1'>
							<div className='bg-emerald-600 rounded-full p-1 animate-pulse'>
								<div className='bg-white rounded-full'>
									<MdOutlineCheckCircle className='text-emerald-600 text-xl ' />
								</div>
							</div>
							<p className='text-sm text-gray-700 font-semibold'>
								Booked
							</p>
						</div>
						<div className='flex items-center justify-between mt-2'>
							<div className='flex items-center gap-x-2'>
								<Image
									src={'/onboarding/second.webp'}
									width={100}
									height={100}
									className='h-8 w-8  object-cover object-top-right rounded-lg '
									alt=''
								/>
								<div className='flex flex-col'>
									<h4 className='text-sm font-semibold'>
										Full body Massage
									</h4>
									<p className='text-xs text-gray-500'>
										12:00 PM
									</p>
								</div>
							</div>
							<div className='flex items-center gap-x-2'>
								<Edit className='text-blue-700 size-4 font-semibold' />
								<Clock className='text-blue-700 size-4 font-semibold' />
							</div>
						</div>
					</motion.div>
					<motion.div
						className='absolute bottom-32 -left-60 bg-white rounded-md p-2 shadow-md min-w-[300px] '
						initial={{ opacity: 0, y: 100, x: 100 }}
						whileInView={{ opacity: 1, y: 0, x: -10 }}
						exit={{ opacity: 0, y: 100, x: 0 }}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
							delay: 0.1,
							type: 'spring',
							stiffness: 100,
						}}
						viewport={{ once: true, amount: 0.5 }}
					>
						<div className='flex items-center gap-x-1'>
							<div className='bg-emerald-600 rounded-full p-1 animate-pulse'>
								<div className='bg-white rounded-full'>
									<MdOutlineCheckCircle className='text-emerald-600 text-xl ' />
								</div>
							</div>
							<p className='text-sm text-gray-700 font-semibold'>
								Booked
							</p>
						</div>
						<div className='flex items-center justify-between mt-2'>
							<div className='flex items-center gap-x-2'>
								<Image
									src={'/onboarding/second.webp'}
									width={100}
									height={100}
									className='h-8 w-8  object-cover object-top-right rounded-lg '
									alt=''
								/>
								<div className='flex flex-col'>
									<h4 className='text-sm font-semibold'>
										body Treatment
									</h4>
									<p className='text-xs text-gray-500'>
										10:00 AM
									</p>
								</div>
							</div>
							<div className='flex items-center gap-x-2'>
								<Edit className='text-blue-700 size-4 font-semibold' />
								<Clock className='text-blue-700 size-4 font-semibold' />
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
			<div className='pt-6 flex flex-col items-center max-w-[500px] space-y-4'>
				<h2 className='font-semibold text-2xl'>
					Smarter scheduling for your buiness
				</h2>
				<p className='text-lg text-center'>
					Easily manage bookings, staff schedules, and walk-ins with
					one powerful app.
				</p>
			</div>
		</motion.div>
  );
}

export default ThirdPage