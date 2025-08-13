import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const FirstPage = () => {
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
			viewport={{ once: true, amount: 0.5 }}
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
				<div className='w-[300px] h-[300px]   flex items-center justify-center p-4 bg-white  rounded-lg  '>
					<Image
						src={'/onboarding/first.webp'}
						width={300}
						height={300}
						className='h-full w-full object-cover rounded-lg '
						alt=''
					/>
				</div>
			</motion.div>

			<div className='pt-14 flex flex-col items-center max-w-[500px] space-y-4'>
				<h2 className='font-semibold text-2xl'>
					Find Services Near You
				</h2>
				<p className='text-lg text-center'>
					Browse trusted local businesses, from barbers to tailors all
					in one place. No more guesswork.
				</p>
			</div>
		</motion.div>
	);
};

export default FirstPage;
