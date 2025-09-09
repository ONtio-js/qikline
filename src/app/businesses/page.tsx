'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/status/EmptyState';
import BusinessCard from '@/components/customer/BusinessCard';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { ChevronDown, ChevronRight, ChevronUp, X } from 'lucide-react';
import SearchResult from '@/components/SearchResult';
import SearchBox from '@/components/admin/searchBox';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import { Checkbox } from '@/components/ui/checkbox';
import { useNetworkStatus } from '@/hooks/use-network-status';
import OfflineState from '@/components/status/OfflineState';
const CustomersPage = () => {
	interface BusinessProps {
		id: number;
		name: string;
		description: string;
		image: string;
		location: string;
		category: string[];
		rating: number;
		address: string;
		city: string;
		state: string;
		images: {
			id: number;
			image: string;
		}[];
	}


	const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [searchIsError, setSearchIsError] = useState(false);
	const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
	const pathname = usePathname();
	const id = pathname.split('/').pop();

	const onClose = () => {
		setIsOpen(false);
	};

	const fetchSearchResults = useCallback((searchTerm: string) => {
		setSearchIsLoading(true);
		setSearchIsError(false); 

		fetch(
			process.env.NEXT_PUBLIC_API_URL +
				`/businesses/search?searchTerm=${searchTerm}`
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => setSearchResults(data))
			.catch((error) => {
				console.error('Search error:', error);
				setSearchIsError(true);
			})
			.finally(() => setSearchIsLoading(false));
	}, []);

	const onSearch = useCallback(() => {
		if (debouncedSearchTerm.length < 3) {
			toast.error('Please enter at least 3 characters', {
				duration: 2000,
				className: 'bg-red-500 text-white',
				icon: <X className='w-4 h-4' />,
				style: {
					backgroundColor: 'red',
					color: 'white',
				},
				position: 'top-right',
			});
			return;
		}
		if (debouncedSearchTerm.length > 30) {
			toast.error('Please enter less than 30 characters', {
				duration: 2000,
				className: 'bg-red-500 text-white',
				icon: <X className='w-4 h-4' />,
				style: {
					backgroundColor: 'red',
					color: 'white',
				},
				position: 'top-right',
			});
			return;
		}

		setIsOpen(true);
		fetchSearchResults(debouncedSearchTerm);
	}, [debouncedSearchTerm, fetchSearchResults]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		const fetchBusinesses = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					process.env.NEXT_PUBLIC_API_URL +
						`/businesses/?page=1&page_size=9`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				if (data.results) {
					setBusinesses(data.results);
				} else if (Array.isArray(data)) {
					setBusinesses(data);
				} else {
					console.error('Unexpected API response structure:', data);
					setBusinesses([]);
				}
			} catch (error) {
				console.error('Error fetching businesses:', error);
				setIsError(true);
				setBusinesses([]);
			}finally{
				setIsLoading(false);
			}
		};
		fetchBusinesses();
	}, []);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const businessesPerPage: number = 9;

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const paginationData = useMemo(() => {
		const totalPages = Math.ceil(businesses?.length / businessesPerPage);
		const startIndex = (currentPage - 1) * businessesPerPage;
		const endIndex = startIndex + businessesPerPage;
		const currentBusinesses = businesses?.slice(startIndex, endIndex);

		return { totalPages, startIndex, endIndex, currentBusinesses };
	}, [businesses, currentPage, businessesPerPage]);

	const { totalPages, currentBusinesses } = paginationData;
	const {isOffline} = useNetworkStatus()
	return (
		<>
			<Header />
			<div className='mt-24 p-6 md:px-20 flex items-center gap-x-1 text-gray-800 font-medium'>
				<Link
					className='text-gray-500 '
					href={'/'}
				>
					Home
				</Link>{' '}
				<ChevronRight /> Explore Businesses
			</div>
			{id === 'businesses' && (
				<div className='flex flex-col gap-y-4 w-full md:px-20 p-6 pt-0 '>
					<div>
						<h4 className='text-2xl font-semibold text-gray-700'>
							Find Businesses
						</h4>
						<p className='text-gray-500'>
							Explore and discover local businesses that cater
							your needs.
						</p>
					</div>
					<div className='flex flex-col md:flex-row md:items-center items-start   w-full md:py-6 gap-4'>
						<div className='w-full md:w-auto'>
							<SearchBox
								placeholder='Search for a business by name, location, or category'
								value={searchTerm}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setSearchTerm(e.target.value)}
							/>
						</div>

						<Button
							onClick={onSearch}
							className='w-40 h-11 text-[16px] bg-blue-700 text-white rounded-md hover:bg-blue-800 font-semibold'
						>
							Search
						</Button>
						<DropdownMenu
							onOpenChange={() =>
								setCategoriesIsOpen(!categoriesIsOpen)
							}
						>
							<DropdownMenuTrigger className='focus:outline-none'>
								<div
									className={`flex items-center gap-x-2 bg-white h-12  px-5 rounded-md cursor-pointer font-semibold ${
										categoriesIsOpen
											? ' text-blue-700'
											: 'text-gray-800'
									}`}
								>
									Categories
									{categoriesIsOpen ? (
										<ChevronUp
											size={24}
											className={`${
												categoriesIsOpen
													? 'text-blue-700'
													: 'text-gray-700'
											}`}
										/>
									) : (
										<ChevronDown
											size={24}
											className={`${
												categoriesIsOpen
													? 'text-blue-700'
													: 'text-gray-700'
											}`}
										/>
									)}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='bottom'
								align='end'
							
							>
								<DropdownMenuItem className='flex items-center gap-x-2'><Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p>Beauty</p></DropdownMenuItem>

								<DropdownMenuItem  className='flex items-center gap-x-2'><Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p> Health</p></DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'	><Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5 text-white' /> <p> Food</p></DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'>
									{' '}
									<Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5'/> <p>Entertainment</p>
								</DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'> <Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p> Education</p></DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'> <Checkbox onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p> Education</p></DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'> <Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p> Cleaning</p></DropdownMenuItem>
								<DropdownMenuItem className='flex items-center gap-x-2'> <Checkbox onClick={(e) => (e.stopPropagation())} onChange={() => {}} className='cursor-pointer w-5 h-5' /> <p> Other</p></DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			)}

			<SearchResult
				searchTerm={searchTerm}
				searchResults={searchResults}
				isOpen={isOpen}
				searchIsLoading={searchIsLoading}
				searchIsError={searchIsError}
				onClose={onClose}
			/>
			<div className='p-6 md:px-20 px-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 relative '>
				{
					isOffline && <OfflineState />
				}
				{isLoading && (
					<div className='col-span-full flex justify-center items-center h-full py-20'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4'></div>
							<p className='text-gray-500'>
								Loading businesses...
							</p>
						</div>
					</div>
				)}

				{!isOffline && isError && !isLoading &&  (
					<div className='col-span-full flex justify-center items-center h-full py-20'>
						<EmptyState
							title='Error loading businesses'
							description='Failed to load businesses. Please try again later.'
						/>
					</div>
				)}

				{!isLoading &&
					!isError &&
					businesses &&
					businesses.length === 0 && (
						<div className='col-span-full flex justify-center items-center h-full py-20'>
							<EmptyState
								title='No businesses available'
								description='No businesses found at the moment.'
							/>
						</div>
					)}

				{!isError &&
					currentBusinesses &&
					currentBusinesses.length > 0 &&
					currentBusinesses.map((business) => (
						<BusinessCard
							business={business}
							key={business.id}
						/>
					))}
				{businesses?.length >= businessesPerPage && (
					<div className='col-span-full flex justify-between items-center  '>
						<div className='flex items-center gap-x-10 w-full justify-center md:w-1/2 md:justify-end'>
							<Button
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								variant={'outline'}
								className={`md:w-32  h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
									currentPage === 1
										? ' cursor-not-allowed border-gray-300 text-gray-300'
										: ''
								}`}
							>
								Previous{' '}
								<span className={'hidden md:block '}>Page</span>
							</Button>
							<Button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								variant={'outline'}
								className={`md:w-32 w-20 h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
									currentPage === totalPages
										? ' cursor-not-allowed border-gray-300 text-gray-300'
										: ''
								}`}
							>
								Next{' '}
								<span className={'hidden md:block '}>Page</span>
							</Button>
						</div>
						<div className=' items-center gap-x-2 w-1/2 justify-end hidden md:flex'>
							<p className='text-gray-500 text-sm'>page</p>
							<div className='w-20 h-10 border border-gray-200 rounded-md flex items-center justify-center'>
								{currentPage}
							</div>
							<p className='text-gray-500 text-sm'>
								of {totalPages}
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CustomersPage;
