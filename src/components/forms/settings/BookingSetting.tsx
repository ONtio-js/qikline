import { SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

import { SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const BookingSetting = () => {
	return (
		<div className='p-4 px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
			<div className='flex items-center justify-between my-6'>
				<h4 className='text-lg font-semibold text-gray-800'>
					Booking Preferences
				</h4>
			</div>
			<div className='pt-8 space-y-6 '>
				<div className='flex items-center justify-between border-b border-gray-200 pb-4'>
					<div>
						<h4 className='text-lg font-semibold text-gray-600'>
							Accept Online Bookings
						</h4>
						<p className='text-gray-500 mt-2 '>
							Allow customers to book appointments online
						</p>
					</div>
					<div>
						<Switch
							checked={true}
							onCheckedChange={() => {}}
						/>
					</div>
				</div>
				<div className='flex items-center justify-between border-b border-gray-200 pb-4'>
					<div>
						<div className='flex items-center gap-2'>
						<h4 className='text-lg font-semibold text-gray-600'>
							Require Deposit
						</h4>
						<Button
							variant='secondary'
							className='text-white bg-amber-600 hover:bg-amber-700'
						>
							coming soon
						</Button>
						</div>
						<p className='text-gray-500 mt-2 '>
							Require customers to pay a deposit for all bookings
						</p>
					</div>

					<Switch />
				</div>
				<div className='pb-4 space-y-2'>
					<h4 className='text-lg font-semibold text-gray-600'>
						Cancellation Notice
					</h4>
					<Select defaultValue='1'>
						<SelectTrigger
							className='w-full h-12 border-gray-200'
							style={{
								height: '50px',
							}}
						>
							<SelectValue placeholder='Select a cancellation notice' />
						</SelectTrigger>
						<SelectContent className='border-gray-200 '>
							<SelectItem value='1'>4 Hours notice</SelectItem>
							<SelectItem value='2'>12 Hours notice</SelectItem>
							<SelectItem value='3'>24 Hours notice</SelectItem>
						</SelectContent>
					</Select>
					<p className='text-gray-500 mt-2 '>
						Send a cancellation notice to customers 4 hours before
						the appointment
					</p>
				</div>

				<div className='pb-4 space-y-2'>
					<h4 className='text-lg font-semibold text-gray-600'>
						Advance Booking Time
					</h4>
					<Select defaultValue=''>
						<SelectTrigger
							className='w-full  border-gray-200'
							style={{
								height: '50px',
							}}
						>
							<SelectValue placeholder='Select a advance booking time' />
						</SelectTrigger>
						<SelectContent className='border-gray-200 '>
							<SelectItem value='1'>1 Hour</SelectItem>
							<SelectItem value='2'>30 Minutes</SelectItem>
							<SelectItem value='3'>15 Minutes</SelectItem>
						</SelectContent>
					</Select>
					<p className='text-gray-500 mt-2 '>
						Minimum time required between bookings and appointments
					</p>
				</div>
				<div className='flex justify-start gap-4 my-10'>
					<Button className='w-xs h-12 bg-blue-700 text-white text-[16px] hover:bg-blue-800 font-semibold'>
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
};