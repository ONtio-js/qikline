'use client'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Title from '@/components/Title';
import { useRouter } from 'next/navigation';
import {
	Calendar1Icon,
	FlashlightIcon,
	LucideLayoutDashboard,
	SearchIcon,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import HowItWorks from '@/components/HowItWorks';
import Link from 'next/link';
import { servicesFeatures, testmonials } from './Constants';
import Footer from '@/components/Footer';

export default function Home() {
	
	const howItWorks = [
		{
			id: 1,
			title: 'Find a Service',
			description:
				'Browse local service providers and read reviews from real customers.',
			icon: <SearchIcon />,
		},
		{
			id: 2,
			title: 'Choose a Time',
			description:
				'Select from available time slots that work with your schedule.',
			icon: <Calendar1Icon />,
		},
		{
			id: 3,
			title: 'Book Instantly',
			description:
				'Browse local service providers and read reviews from real customers.',
			icon: <FlashlightIcon />,
		},
	];
	const features = [
		{
			id: 1,
			title: 'Smart Scheduling',
			description: 'Sync  booking system that works with your calendar',
			icon: <Calendar1Icon />,
		},
		{
			id: 2,
			title: 'Customer Management',
			description: 'Track customer history and preferences in one place',
			icon: <Users />,
		},
		{
			id: 3,
			title: 'Grow Revenue',
			description: 'Increase bookings by up to 40% with our platform',
			icon: <TrendingUp />,
		},
		{
			id: 4,
			title: 'Analytics Dashboard',
			description: 'Insights to help optimize your business operations',
			icon: <LucideLayoutDashboard />,
		},
	];
	const router = useRouter();
	return (
		<>
			<Header />
			<section className='px-3 bg-gradient-to-t from-[#F1D5FF] via-[] to-[#EFF7FF] py-20'>
				<div className='space-y-6 mt-'>
					<h1 className='text-4xl md:text-5xl font-bold text-center max-w-[550px] mx-auto leading-16'>
						Book services with{' '}
						<span className='text-blue-700'>Ease</span>
					</h1>

					<p className='text-center  text-gray-700 max-w-[570px] mx-auto'>
						Skip the wait. Discover businesses near you and book
						appointments instantly, no calls, no stress.
					</p>
					<div className='flex flex-col mt-10  md:flex-row items-center gap-5 justify-center'>
						<Button
							variant='outline'
							className='text-lg text-white bg-blue-700 w-[18rem] transition-all duration-300 hover:bg-blue-800 hover:text-white h-14  font-medium'
							size='lg'
							onClick={() => router.push('/customers')}
						>
							Find a Service
						</Button>
						<Button
							variant='outline'
							className=' text-lg bg-transparent h-14 text-blue-700 font-medium w-[18rem] transition-all duration-300 hover:bg-blue-700 hover:text-white border border-blue-700  px-5'
							size='lg'
							onClick={() => router.push('/login')}
						>
							List Your Business
						</Button>
					</div>
					<div className='overflow-hidden md:overflow-auto'>
						<div className='overflow-x-scroll flex justify-center items-stretch mx-auto max-w-[50rem] gap-7 mt-20'>
							<div className='w-full'>
								<Image
									src={'/hero-3.jpg'}
									width={200}
									height={200}
									alt='hero-3'
									className='h-full object-cover w-full rounded-md'
								/>
							</div>
							<div className='flex md:flex-col  gap-x-7 space-y-7 md:w-[50%]'>
								<Image
									src={'/hero-2.jpg'}
									width={200}
									height={200}
									alt='hero-3'
									className='w-full h-full rounded-md'
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
			<section className='py-20 md:p-20 px-5 '>
				<Title
					title='How it works'
					description='Getting your service appointment has never been easier. Follow these simple steps to get started.'
				/>
				<div className='grid md:grid-cols-3  align-middle mt-14 justify-items-center gap-y-10'>
					{howItWorks.map((how) => {
						return (
							<HowItWorks
								title={how.title}
								description={how.description}
								icon={how.icon}
								key={how.id}
							/>
						);
					})}
				</div>
				<div className='grid md:grid-cols-2 gap-20 mt-32 md:px-10'>
					<div className='space-y-10'>
						<h2 className='text-3xl font-semibold md:max-w-[25rem] capitalize'>
							grow your business with{' '}
							<span className='text-blue-800'>QikLine</span>
						</h2>
						<p className='text-gray-700 text-lg'>
							List your services, accept bookings, and manage your
							schedule—all in one dashboard. Join thousands of
							businesses already growing with QikLine.
						</p>

						<div className='grid md:grid-cols-2 gap-10 mt-10 '>
							{features.map((feature) => {
								return (
									<div
										key={feature.id}
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
									</div>
								);
							})}
						</div>
						<Button className='bg-blue-700  h-14 w-[20rem] font-medium text-lg '>
							<Link href={'/admin'}>Register Your Business</Link>
						</Button>
					</div>
					<div className='bg-[#F1D9FF] pl-20 my-auto py-10 flex justify-end rounded-2xl'>
						<Image
							src={'/dashboard.svg'}
							width={2000}
							height={1000}
							alt='dashboard'
							className='w-[87%] h-[80%]'
						/>
					</div>
				</div>
				<div className='grid md:grid-cols-2 gap-20 mt-32 md:px-10'>
					<div className='bg-[#F1D9FF] hidden  pl-20 my-auto py-10 md:flex justify-end rounded-2xl'>
						<Image
							src={'/dashboard.svg'}
							width={2000}
							height={1000}
							alt='dashboard'
							className='w-[87%] h-[80%]'
						/>
					</div>
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
									<div
										key={feature.id}
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
									</div>
								);
							})}
						</div>
						<Button className='bg-blue-700  h-14 w-[20rem] font-medium text-lg '>
							<Link href={'/admin'}>Find a service</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className='p-20 '>
				<Title
					title='what our users say'
					description='Join thousands of satisfied customers and business owners who love QikLine.'
				/>
				<div className='grid md:grid-cols-3 gap-10 justify-items-center mt-20 '>
					{testmonials.map((testmonial) => (
						<div
							key={testmonial.id}
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
						</div>
					))}
				</div>
			</section>
			<section className='p-20 pb-0 mb-20 mt-14 bg-gradient-to-t from-[#F1D5FF]  to-[#EFF7FF]'>
				<div className='space-y-10 max-w-3xl mx-auto flex flex-col items-center'>
					<h2 className='text-4xl font-semibold capitalize'>
						start booking{' '}
						<span className='text-blue-700'>smarter</span>
					</h2>
					<p className='text-lg text-gray-800 text-center max-w-2xl'>
						Join thousands of users saving time every day with
						QikLine. Whether you&apos;re a customer or a business
						owner, we&apos;ve got the perfect solution for you.
					</p>
					<div className='flex gap-10'>
						<Link
							href={'/customers'}
							className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 text-lg rounded-md font-medium min-w-3xs text-center'
						>
							Get Started Now
						</Link>
						<Link
							href={'/customers'}
							className='border-blue-700 border text-lg hover:bg-blue-800 hover:text-white px-10 text-blue-700 py-4 rounded-md font-medium min-w-3xs text-center'
						>
							Get Started Now
						</Link>
					</div>
				</div>
				<div className='flex items-end gap-10 justify-center mt-20'>
					<Image
						src={'/Dashboard-1.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='w-1/4 h-full'
					/>
					<Image
						src={'/Dashboard-3.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='w-1/4'
					/>
					<Image
						src={'/Dashboard-2.svg'}
						width={100}
						height={100}
						alt='dashboard'
						className='w-1/4'
					/>
				</div>
			</section>
			<Footer />
		</>
	);
}
