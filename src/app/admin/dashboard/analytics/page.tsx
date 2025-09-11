import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div className=''>
			<div className='space-y-2 w-full md:w-auto p-6 '>
				<h2 className=' text-xl font-semibold text-gray-800 capitalize'>
					{' '}
					Analytics
				</h2>
				<p className='text-gray-500 text-base flex flex-col gap-y-2'>
					
					Get insights into your business performance and metrics with our analytics tools
					<small className='text-gray-500 text-sm '>
						Make informed decisions based on data
					</small>
				</p>
			</div>
			<Separator />
			<div className='p-6 flex items-center justify-center h-[calc(100vh-300px)]'>
				<div className='flex flex-col gap-y-2 items-center justify-center'>
					<h2 className='text-2xl font-semibold text-blue-800 capitalize'	>
						Coming soon
					</h2>
					<p className='text-gray-500 text-base'>
						this feature is under development
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;