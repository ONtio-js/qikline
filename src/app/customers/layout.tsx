'use client';
import { useState } from 'react';
import { Bell, Settings, X } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomerSieBar from '@/components/customer/CustomerSieBar';
import SearchBox from '@/components/admin/searchBox';
import { Button } from '@/components/ui/button';
import SearchResult from '@/components/SearchResult';
import Menubar from '@/components/Menuba';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
 
const Layout = ({children}: {children: React.ReactNode}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();
	const id = pathname.split('/').pop();
	
	const onClose = () => {
		setIsOpen(false);
	}


	const onSearch = () => {
		if(searchTerm.length < 3) {
			toast.error('Please enter at least 3 characters',{
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
		if(searchTerm.length > 30) {
			toast.error('Please enter less than 30 characters',{
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
		fetchSearchResults(searchTerm);
	}


	const fetchSearchResults = (searchTerm: string) => {
		setIsLoading(true);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/businesses/search?searchTerm=${searchTerm}`)
			.then(res => res.json())
			.then(data => setSearchResults(data))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}

	
  return (
		<>
		<SidebarProvider>
			<CustomerSieBar />
			<main className=' w-full overflow-x-hidden'>
				{/* <SidebarTrigger color='blue' /> */}
				<div className='flex items-center justify-between md:justify-end w-full p-6 md:pb-10 border-b border-gray-200'>
					<div className='flex md:hidden items-center gap-x-4'>
					<Logo />
					</div>
					<div className='hidden md:flex items-center gap-x-4'>
						<Settings
							size={24}
							className='text-gray-400'
						/>
						<Bell
							size={24}
							className='text-gray-400'
						/>
					</div>
					<div className='md:hidden flex items-center gap-x-4'>
					<Menubar />
					</div>
				</div>{' '}
				{id === 'customers' && (
				<div className='flex flex-col gap-y-4 w-full p-6  border-b border-gray-200'>
                    <div>
					<h4 className='text-2xl font-semibold text-gray-700'>Find Businesses & Services </h4>
					<p className='text-gray-500'>Manage your appointments and business operations</p>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center items-end   w-full md:py-6 gap-4'>
						<div className='w-full md:w-1/2'>
                        <SearchBox placeholder='Search for a business by name, location, or category' value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} />
                        </div>
                     
                        <Button onClick={onSearch} className='w-40 h-11 text-[16px] bg-blue-700 text-white rounded-md hover:bg-blue-800 font-semibold'>
                            Search
                            </Button>
                      
                    </div>
					</div>
				)}
				{children}
			</main>
		</SidebarProvider>
		<SearchResult
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			searchResults={searchResults}
			isLoading={isLoading}
			isError={isError}
			isOpen={isOpen}
			onClose={onClose}
		/>
		</>
  );
};


export default Layout;