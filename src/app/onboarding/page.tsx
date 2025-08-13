'use client';
import Logo from '@/components/Logo';
import FirstPage from '@/components/onboarding/FirstPage';
import SecondPage from '@/components/onboarding/SecondPage';
import ThirdPage from '@/components/onboarding/ThirdPage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OnboardingPage = () => {
	const [page, setPage] = useState(0);
  const router = useRouter();
	const handleContinue = () => {
		if (page < 2) {
			setPage(page + 1);
		}
    if(page == 2){
      router.push('/onboarding/role')
    }
	};
 const handleBack = () => {
   if(page > 0){
    setPage(page - 1)
   }
 }
	const handleSkip = () => {
    router.push('/onboarding/role')
	};

	const renderPage = () => {
		switch (page) {
			case 0:
				return <FirstPage />;
			case 1:
				return <SecondPage />;
			case 2:
				return <ThirdPage />;
			default:
				return <FirstPage />;
		}
	};

	return (
		<div className='h-screen w-screen bg-white p-10 px-16 text-gray-700'>
			<div className='w-full pb-5'>
				<Logo />
			</div>
			<Image
				src={'/onboarding/vector1.svg'}
				width={50}
				height={100}
				alt=''
				className='absolute right-40 bottom-52'
			/>
			<Image
				src={'/onboarding/vector2.svg'}
				width={50}
				height={100}
				alt=''
				className='absolute left-40 top-52 animate-spin duration-700'
			/>
			<div className='flex items-center justify-end w-full'>
				<div className='w-1/2 flex items-center justify-between'>
					<p className='text-lg font-medium '>{page + 1} of 3</p>

					<button
						onClick={handleSkip}
						className='text-lg text-gray-700 capitalize font-medium cursor-pointer'
					>
						skip
					</button>
				</div>
			</div>
			<div className='w-full flex items-center justify-center '>
				{renderPage()}
			</div>

			<div className='mt-10 w-full flex flex-col items-center gap-y-20'>
				<div className='w-full flex  justify-center '>
					<div className='flex items-center gap-x-10'>
						{page >= 1 && (
							<div
								className='bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center'
								onClick={handleBack}
							>
								<ChevronLeft color='blue'/>
							</div>
						)}
						<div className='flex items-center gap-x-1'>
							<div
								className={` h-2 ${
									page === 0
										? 'bg-blue-700 w-10'
										: 'bg-gray-300 w-7'
								} rounded-full transition-all duration-500 ease-in-out `}
							></div>
							<div
								className={`w-7 h-2 ${
									page === 1
										? 'bg-blue-700 w-10'
										: 'bg-gray-300 w-7'
								} rounded-full transition-all duration-500 ease-in-out`}
							></div>
							<div
								className={` h-2 ${
									page === 2
										? 'bg-blue-700 w-10'
										: 'bg-gray-300 w-7'
								} rounded-full transition-all duration-500 ease-in-out`}
							></div>
						</div>
						{page != 2 && (
							<div
								className='bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center'
								onClick={handleContinue}
							>
								<ChevronRight color='blue' />
							</div>
						)}
					</div>
				</div>
				<button
					onClick={handleContinue}
					className='bg-blue-700 w-[300px] capitalize text-center text-2xl font-[600] py-3 text-white rounded-xl'
				>
					continue
				</button>
			</div>
		</div>
	);
};

export default OnboardingPage;
