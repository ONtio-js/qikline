'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SearchBox = ({ placeholder }: { placeholder: string }) => {
	const [isFocused, setIsFocused] = useState(false);
	const pathname = usePathname();
	let name = pathname.split('/').pop();
	name = name === 'dashboard' ? 'appointments' : name;
	return (
		<div className='flex items-center gap-x-2 border border-gray-200 p-4 py-1 rounded-md md:w-md w-auto  '>
			<Search
				size={24}
				className={`${
					isFocused ? 'text-blue-700' : 'text-gray-400'
				} transition-colors duration-200 ease-in-out`}
			/>
			<Input
				type='text'
				placeholder={placeholder + name}
				className='border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent'
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
};

export default SearchBox;
