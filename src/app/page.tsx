'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Title from '@/components/Title';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import HowItWorks from '@/components/HowItWorks';
import Link from 'next/link';
import { servicesFeatures, testmonials } from './Constants';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { howItWorks, features, businesses } from '../constants';
import BusinessCard from '@/components/customer/BusinessCard';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('@/components/SearchBusinessBox'), {
	loading: () => '',
	ssr: false, 
});
export default function Home() {
	const router = useRouter();
	return (
		<div className='overflow-x-hidden pt-10 md:pt-20'>
			<Header />
			<section className='px-3 bg-gradient-to-t from-[#F1D5FF] via-[] to-[#EFF7FF] py-20'>
				<div className='space-y-6 mt-'>
					<h1 className='text-3xl md:text-5xl font-bold text-center max-w-[550px] mx-auto leading-16'>
						Book services with{' '}
						<motion.span
							initial={{ opacity: 0, x: -10, y: -10 }}
							whileInView={{ opacity: 1, x: 0, y: 0 }}
							transition={{
								duration: 0.3,
								delay: 0.1,
								type: 'spring',
								stiffness: 200,
								damping: 10,
							}}
							className='text-blue-700 inline-block'
						>
							Ease
						</motion.span>
					</h1>

					<p className='text-center  text-gray-700 max-w-[570px] mx-auto mb-10'>
						Skip the wait. Discover businesses near you and book
						appointments instantly, no calls, no stress.
					</p>
					<SearchBox />
					<div className='overflow-hidden md:overflow-auto'>
						<div className='overflow-x-scroll no-scrollbar flex justify-center items-stretch mx-auto md:max-w-[50rem] gap-7 mt-10'>
							<div className='w-[60%] flex-shrink-0 hidden md:block'>
								<Image
									src={'/hero-3.jpg'}
									width={200}
									height={200}
									alt='hero-3'
									className='h-full object-cover w-full rounded-md '
								/>
							</div>
							<div className='flex md:flex-col  gap-x-5 space-y-7 md:w-[50%] '>
								<Image
									src={'/hero-3.jpg'}
									width={200}
									height={200}
									alt='hero-3'
									className='w-[90%] h-full rounded-md md:hidden'
								/>
								<Image
									src={'/hero-2.jpg'}
									width={200}
									height={200}
									alt='hero-3'
									className='h-full w-full rounded-md'
								/>

								<Image
									src={'/hero-1.png'}
									width={200}
									height={200}
									alt='hero-3'
									className='w-full rounded-md'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='py-10 md:p-20 md:pb-10 px-5 '>
				<Title
					title='Trusted by Local Businesses'
					description='Getting your service appointment has never been easier. Follow these simple steps to get started.'
				/>
				<div className='overflow-x-scroll no-scrollbar'>
					<div className='grid grid-cols-3 gap-x-10 justify-items-center mt-15 min-w-[1000px] overflow-hidden '>
						{businesses.map((business) => {
							return (
								<BusinessCard
									style={{ width: '100%' }}
									key={business.id}
									business={business}
								/>
							);
						})}
					</div>
				</div>
				<div className='flex justify-center mt-10'>
					<Button
						className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 text-lg h-12 rounded-md font-medium min-w-3xs text-center'
						onClick={() => router.push('/businesses')}
					>
						Explore All Businesses
					</Button>
				</div>
			</section>
			<section className='py-20 md:p-20 px-5 '>
				<Title
					title='How it works'
					description='Getting your service appointment has never been easier. Follow these simple steps to get started.'
				/>
				<div className='grid md:grid-cols-3  align-middle mt-14 justify-items-center gap-y-10'>
					{howItWorks.map((how) => {
						return (
							<HowItWorks
								key={how.id}
								title={how.title}
								description={how.description}
								icon={how.icon}
								id={how.id}
							/>
						);
					})}
				</div>
				<div className='grid md:grid-cols-2 gap-20 mt-32 md:px-10'>
					<div className='space-y-10'>
						<h2 className='text-3xl font-semibold md:max-w-[25rem] capitalize'>
							grow your business with{' '}
							<motion.span
								initial={{ opacity: 0, x: -10 }}
								whileInView={{
									opacity: 1,
									x: 0,
									transition: { duration: 0.3, delay: 0.1 },
								}}
								className='text-blue-800'
							>
								QikLine
							</motion.span>
						</h2>
						<p className='text-gray-700 text-lg'>
							List your services, accept bookings, and manage your
							schedule—all in one dashboard. Join thousands of
							businesses already growing with QikLine.
						</p>

						<div className='grid md:grid-cols-2 gap-10 mt-10 '>
							{features.map((feature) => {
								return (
									<motion.div
										key={feature.id}
										initial={{
											opacity: 0,
											x: feature.id % 2 === 0 ? -10 : 10,
										}}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.3,
											delay: feature.id * 0.1,
											type: 'spring',
											stiffness: 200,
											damping: 10,
										}}
										className='flex gap-4 items-start'
									>
										<div className='p-5 text-white  bg-blue-600/80 rounded-2xl'>
											{feature.icon}
										</div>
										<div className='space-y-2'>
											<h2 className='text-gray-800 font-semibold'>
												{feature.title}
											</h2>
											<p className='text-gray-600'>
												{feature.description}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>
						<Button className='bg-blue-700 hover:bg-blue-800  h-12 w-[20rem] font-medium text-lg '>
							<Link href={'/admin'}>Register Your Business</Link>
						</Button>
					</div>
					<motion.div
						initial={{ opacity: 0, x: -100, y: -20 }}
						whileInView={{
							opacity: 1,
							x: 0,
							y: 0,
							transition: { duration: 0.5, delay: 0.1 },
						}}
						className='bg-[#F1D9FF] pl-20 my-auto py-10 flex justify-end rounded-2xl'
					>
						<motion.img
							initial={{ opacity: 0, x: 100, y: 20 }}
							whileInView={{
								opacity: 1,
								x: 0,
								y: 0,
								transition: {
									duration: 0.3,
									delay: 0.2,
									type: 'spring',
									stiffness: 200,
									damping: 10,
								},
							}}
							src={'/dashboard.svg'}
							width={2000}
							height={1000}
							alt='dashboard'
							className='w-[87%] h-[80%]'
						/>
					</motion.div>
				</div>
				<div className='flex flex-col-reverse md:flex-row gap-20 mt-32 md:px-10'>
					<motion.div
						initial={{ opacity: 0, x: 100, y: 20 }}
						whileInView={{
							opacity: 1,
							x: 0,
							y: 0,
							transition: { duration: 0.5, delay: 0.1 },
						}}
						className='bg-[#F1D9FF]   pl-20 my-auto md:py-24 py-10 flex justify-end rounded-2xl w-full'
					>
						<motion.img
							initial={{ opacity: 0, x: -100, y: -20 }}
							whileInView={{
								opacity: 1,
								x: 0,
								y: 0,
								transition: {
									duration: 0.5,
									delay: 0.1,
									type: 'spring',
									stiffness: 200,
									damping: 10,
								},
							}}
							exit={{ opacity: 0, x: -100, y: -20 }}
							src={'/businesses.svg'}
							width={2000}
							height={1000}
							alt='dashboard'
							className='md:w-[87%] md:h-[80%] w-full h-full'
						/>
					</motion.div>
					<div className='space-y-10'>
						<h2 className='text-3xl font-semibold max-w-[25rem] capitalize'>
							Find trusted
							<span className='text-blue-800'>
								{' '}
								Local services
							</span>
						</h2>
						<p className='text-gray-700 text-lg'>
							Search and book appointments with verified
							businesses near you. From beauty services to fitness
							training, we&apos;ve got you covered.
						</p>

						<div className='grid md:grid-cols-2 gap-10 mt-10 '>
							{servicesFeatures.map((feature) => {
								return (
									<motion.div
										key={feature.id}
										initial={{
											opacity: 0,
											x: feature.id % 2 === 0 ? -10 : 10,
										}}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.3,
											delay: feature.id * 0.1,
											type: 'spring',
											stiffness: 200,
											damping: 10,
										}}
										className='flex gap-4 items-start'
									>
										<div className='p-5 text-white  bg-blue-600/80 rounded-2xl'>
											{feature.icon}
										</div>
										<div className='space-y-2'>
											<h2 className='text-gray-800 font-semibold'>
												{feature.title}
											</h2>
											<p className='text-gray-600'>
												{feature.description}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>
						<Button className='bg-blue-700 hover:bg-blue-800  h-12 w-[20rem] font-medium text-lg '>
							<Link href={'/admin'}>Find a service</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className='md:p-20 py-20 px-5'>
				<Title
					title='what our users say'
					description='Join thousands of satisfied customers and business owners who love QikLine.'
				/>
				<div className='grid md:grid-cols-3 gap-10 justify-items-center mt-20 '>
					{testmonials.map((testmonial) => (
						<motion.div
							key={testmonial.id}
							initial={{ opacity: 0, x: -100, y: -20 }}
							whileInView={{ opacity: 1, x: 0, y: 0 }}
							transition={{
								duration: 0.3,
								delay: testmonial.id * 0.1,
								type: 'spring',
								stiffness: 200,
								damping: 10,
							}}
							className='border border-gray-200 p-8 rounded-2xl '
						>
							<p className='flex gap-1 mb-6'>
								{Array.from(
									{ length: testmonial.star },
									(_, index) => (
										<Star
											key={index}
											fill='orange'
											color='orange'
											size={20}
											className='flex-shrink-0'
										/>
									)
								)}
							</p>
							<p>{testmonial.message}</p>
							<hr className='mt-6 h-2' />
							<div className='flex items-start gap-5 mt-5'>
								<div className='bg-blue-600/80 rounded-full h-11 w-11 text-white flex items-center justify-center font-semibold'>
									{testmonial.from.split(' ')[0][0]}
									{testmonial.from.split(' ')[1][0]}
								</div>
								<div className='space-y-2'>
									<h3 className='font-semibold'>
										{testmonial.from}
									</h3>
									<p>{testmonial.profession}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>
			<section className='md:p-20 md:pb-0 pt-20 px-5 pb-0 mb-20 mt-14 bg-gradient-to-t from-[#F1D5FF]  to-[#EFF7FF]'>
				<div className='space-y-10 max-w-3xl mx-auto flex flex-col items-center'>
					<h2 className='md:text-4xl text-3xl font-semibold capitalize'>
						start booking{' '}
						<motion.span
							initial={{ opacity: 0, scale: 1.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.3,
								delay: 0.1,
								type: 'spring',
								stiffness: 200,
								damping: 10,
							}}
							className='text-blue-700'
						>
							smarter
						</motion.span>
					</h2>
					<p className='md:text-lg text-base text-gray-800 text-center max-w-2xl'>
						Join thousands of users saving time every day with
						QikLine. Whether you&apos;re a customer or a business
						owner, we&apos;ve got the perfect solution for you.
					</p>
					<div className='flex flex-col md:flex-row gap-10'>
						<Link
							href={'/businesses'}
							className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 text-lg rounded-md font-medium min-w-3xs text-center'
						>
							Explore All Businesses
						</Link>
						<Link
							href={'/admin'}
							className='border-blue-700 border text-lg hover:bg-blue-800 hover:text-white px-10 text-blue-700 py-4 rounded-md font-medium min-w-3xs text-center'
						>
							Register Your Business
						</Link>
					</div>
				</div>
				<div className='flex items-end gap-10 justify-center mt-20 overflow-y-hidden '>
					<motion.img
						initial={{ opacity: 0, x: -100, y: -20 }}
						whileInView={{ opacity: 1, x: 0, y: 0 }}
						transition={{ duration: 0.3, delay: 0.1 }}
						src={'/Dashboard-1.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='w-1/4 h-full hidden md:block'
					/>
					<motion.img
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.2 }}
						src={'/Dashboard-3.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='md:w-1/4 w-full -mb-32 md:mb-0'
					/>
					<motion.img
						initial={{ opacity: 0, x: -100, y: -20 }}
						whileInView={{ opacity: 1, x: 0, y: 0 }}
						transition={{ duration: 0.3, delay: 0.3 }}
						src={'/Dashboard-2.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='hidden md:block w-1/4'
					/>
				</div>
			</section>
			<Footer />
		</div>
	);
}
