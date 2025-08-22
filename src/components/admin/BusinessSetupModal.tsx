import { X } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const BusinessSetupModal = ({ onClose }: { onClose: () => void }) => {
	const router = useRouter();
	return (
		<div className='fixed backdrop-blur inset-0 bg-black/10  flex justify-center  md:items-center items-end z-50'>
			<motion.div
				initial={{
					y: 200,
					opacity: 0,
				}}
				whileInView={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 0.2,
					ease: 'easeIn',
					delay: 0.2,
				}}
				className=' md:w-2/3 w-full bg-white p-10 md:rounded-xl rounded-t-2xl border border-gray-200 flex flex-col items-center  gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer  space-y-4 '
			>
				<div className='flex justify-between items-center w-full'>
					<h4 className='text-lg font-semibold'>Business Setup</h4>
					<span className='cursor-pointer bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all group duration-300'>
						<X
							className='w-4 h-4 cursor-pointer group-hover:text-red-500 hover:scale-110 transition-all duration-300'
							onClick={onClose}
						/>
					</span>
				</div>
				<div className='w-[200px] h-[200px]   flex items-center justify-center   bg-gray-100  rounded-full overflow-hidden  '>
					<Image
						src={'/admin/icons/direction.png'}
						width={100}
						height={100}
						className='w-[150px] h-[150px] mt-10'
						alt=''
					/>
				</div>
				<div className='flex flex-col gap-y-3 w-full items-center mb-15'>
					<h3 className='text-xl font-medium'>
						Complete your business setup
					</h3>
					<p className=' text-gray-500 text-center max-w-[80%]'>
						Let’s finish setting up your business profile so
						customers can discover and book your services.
					</p>
					<Button
						className='md:w-xs w-full mt-10 h-12 bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300  text-lg'
						onClick={() => {
							router.push('/admin/dashboard/settings');
						}}
					>
						Complete Setup
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

export default BusinessSetupModal;
