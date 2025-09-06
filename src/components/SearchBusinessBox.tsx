'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { businesses } from '@/constants';
import Link from 'next/link';
type SearchResultsProps = {
    id: number;
    name: string;
    description: string;
    image: string;
}
const SearchBusinessBox = () => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [searchResults,setSearchResults] = useState<SearchResultsProps[]>([]);
    const fetchSearchResults = useCallback((searchTerm: string) => {
       
        const results = businesses.filter((business) => business.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults([...results as SearchResultsProps[],...results as SearchResultsProps[]]);
      
        
    }, []);  
    useEffect(() => {
        fetchSearchResults(searchTerm);
    }, [searchTerm, fetchSearchResults]);
  return (
		<div className='flex flex-col gap-y-4'>
			<div className='  max-w-md mx-auto space-y-2 relative '>
				<div className='flex items-center gap-x-2 border bg-white border-gray-200 p-4 py-1 rounded-md md:w-md w-auto  '>
					<Search
						size={24}
						className={`${
							isFocused ? 'text-blue-700' : 'text-gray-400'
						} transition-colors duration-200 ease-in-out`}
					/>
					<Input
						type='text'
						placeholder='Search businesses near you'
						className='border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
                <motion.div initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} exit={{opacity:0,y:100}} transition={{duration:0.3,ease:'easeInOut'}} className={`h-72 w-full bg-gray-50 rounded-md absolute  left-0 right-0 mx-auto p-4 ${searchTerm.length > 0 ? 'block' : 'hidden'} no-scrollbar overflow-y-auto`}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result,index) => (
                            <motion.div key={result.id} initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} exit={{opacity:0,x:100}} transition={{duration:0.3,ease:'easeInOut',delay:0.1 * index,type:'spring',stiffness:100,damping:10}} className='flex items-center gap-x-2 hover:bg-gray-100 p-2 rounded-md'>
                                <Link href={`/businesses/${result.id}`} className='flex items-center gap-x-2 w-full'>
                                <Image src={result.image? result.image : '/hero-1.png'} alt={result.name} width={50} height={50} className='rounded-md' />
                                <div className='flex flex-col'>
                                    <h2 className='text-lg font-semibold'>{result.name}</h2>
                                    <p className='text-sm text-gray-500'>{result.description || 'No description'}</p>
                                </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className='text-gray-500 h-full flex items-center justify-center'>No results found</div>
                    )}
                </motion.div>
				<p className='text-sm md:text-base text-center text-gray-700'>
					Discover and Book appointments with businesses near you.
				</p>
			</div>
		</div>
  );
}

export default SearchBusinessBox