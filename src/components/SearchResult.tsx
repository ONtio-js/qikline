import { X } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
interface SearchResultsProps {
	id: string;
	name: string;
	description: string;
	image: string;
	location: string;
	category: string[];
	rating: number;
}
type SearchResultProps = {
	searchTerm: string;
	searchResults: SearchResultsProps[];
	isOpen: boolean;
	onClose: () => void;
	searchIsLoading: boolean;
	searchIsError: boolean;
};
const SearchResult = React.memo(
	({
		searchTerm,
		searchResults,
		isOpen,	
		searchIsLoading,
		searchIsError,
		onClose,
	}: SearchResultProps) => {
		return (
			<div
				className={`fixed backdrop-blur z-50 top-0 left-0 w-full h-full bg-black/20 ${
					isOpen ? 'block' : 'hidden'
				}`}
				onClick={onClose}
			>
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 100 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='w-full md:w-1/2 h-[80vh] bg-white rounded-md absolute bottom-0 left-0 right-0 mx-auto p-10 overflow-y-auto no-scrollbar'
					onClick={(e) => e.stopPropagation()}
				>
					<div className='w-full h-full'>
						<div className='w-full flex items-center justify-between mb-4'>
							<h1 className=' text-gray-700'>
								{' '}
								search results for{' '}
								<span className='text-blue-700 font-semibold text-lg'>
									{searchTerm}
								</span>
							</h1>
							<Button
								variant='outline'
								className=' rounded-full border-none'
								onClick={onClose}
							>
								<X className='w-6 h-6 text-gray-500' />
							</Button>
						</div>
						<div className='w-full h-full'>
							{searchIsLoading ? (
								<div className='text-gray-500 h-full flex items-center justify-center'>
									Loading...
								</div>
							) : searchIsError ? (
								<div className='text-gray-500 h-full flex items-center justify-center'>
									Error loading search results
								</div>
							) : searchResults.length > 0 ? (
								searchResults.map(
									(
										result: SearchResultsProps,
										index: number
									) => (
										<motion.div
											key={result.id}
											initial={{ opacity: 0, x: 100 }}
											whileInView={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 100 }}
											transition={{
												duration: 0.3,
												ease: 'easeInOut',
												delay: 0.05 * index,
												type: 'spring',
												stiffness: 100,
												damping: 10,
											}}
											className='flex items-center gap-x-2'
										>
											<Link
												href={`/businesses/${result.id}`}
											>
												<div className='flex items-center gap-x-2'>
													<Image
														src={result.image}
														alt={result.name}
														width={50}
														height={50}
														className='rounded-md'
													/>
													<div className='flex flex-col'>
														<h2 className='text-lg font-semibold'>
															{result.name}
														</h2>
														<p className='text-sm text-gray-500'>
															{result.description}
														</p>
													</div>
												</div>
											</Link>
										</motion.div>
									)
								)
							) : (
								<div className='text-gray-500 h-full flex items-center justify-center'>
									No results found
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		);
	}
);

SearchResult.displayName = 'SearchResult';

export default SearchResult;
