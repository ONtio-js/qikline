'use client';
import { Clock, X } from 'lucide-react';
import React, { useState } from 'react';
import { Select, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { TimePickerModal } from '@/components/ui/time-picker-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {motion} from 'framer-motion'
type CreateBookingFormProps = {
	isOpen: boolean;
	onClose: () => void;
};
const CreateBookingForm = ({ isOpen, onClose }: CreateBookingFormProps) => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [timePickerOpen, setTimePickerOpen] = useState(false);
	return (
		<div
			className={` backdrop-blur fixed top-0 left-0 w-full h-full bg-black/20 z-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
			onClick={onClose}
		>
			<motion.div
				initial={{
					y:200,
					opacity:0
				}}
				whileInView={{
					y:0,
					opacity:1
				}}
				transition={{
					duration:0.2,
					ease:'easeIn',
					delay:0.2
				}}
				onClick={(e) => e.stopPropagation()}
				className='w-full h-[85%] bg-white rounded-t-3xl bottom-0 absolute p-6 space-y-6 overflow-y-auto no-scrollbar'
			>
				<div className='flex justify-between items-center '>
					<h4 className='text-lg font-medium'>New Booking</h4>
					<X
						size={20}
						onClick={onClose}
						className='cursor-pointer hover:text-gray-500 transition-all duration-300 text-gray-400'
					/>
				</div>
				<div className='space-y-2 w-full'>
					<h4 className='text-sm font-medium text-gray-700'>
						Select Service
					</h4>
					<Select onValueChange={(value) => console.log(value)}>
						<SelectTrigger
							className='w-full'
							style={{ height: '50px' }}
						>
							<SelectValue placeholder='Select a service' />
						</SelectTrigger>
					</Select>
          <div className='flex flex-col gap-y-2 mt-7'>
            <label htmlFor="name" className='text-sm font-medium text-gray-700'>Name</label>
            <Input type='text' id='name' placeholder='Enter customer name' name='name' className='w-full h-12' />
          </div>
          <div className='flex flex-col gap-y-2 mt-7'>
            <label htmlFor="name" className='text-sm font-medium text-gray-700'>Phone</label>
            <Input type='text' id='name' placeholder='Enter customer phone' name='phone' className='w-full h-12' />
          </div>
          
          <div className='flex flex-col gap-y-2 mt-7'>
            <label htmlFor="name" className='text-sm font-medium text-gray-700'>Email</label>
            <Input type='text' id='name' placeholder='Enter customer email' name='email' className='w-full h-12' />
          </div>
          
          
					<Separator className='my-6' />
					<h4 className='text-sm font-medium text-gray-700'>
						Select Date & Time
					</h4>
					<div className='flex flex-col gap-y-4 mt-7'>
						<h3 className='text-sm  text-gray-500'> Select Date</h3>
						<Calendar
							className='w-full max-w-md rounded-md shadow-2xl cursor-pointer'
							mode='single'
							selected={date}
							onSelect={setDate}
							onDayClick={(date) => setDate(date)}
						/>
						{date && (
							<div className='flex flex-col gap-y-2 mt-7'>
								<div className='flex items-center gap-x-2'>
									<div className='flex items-center gap-x-2 cursor-pointer hover:text-gray-500 transition-all duration-300 border border-gray-200 rounded-md p-2 px-4 bg-blue-700 text-white' onClick={() => setTimePickerOpen(true)}>
										<h3 className='text-sm  '>
											{' '}
											Select Time
										</h3>
										<Clock
											size={24}
              
											className='cursor-pointer '
										/>
									</div>
									<TimePickerModal
										open={timePickerOpen}
										setOpen={setTimePickerOpen}
										onTimeSelect={(time) =>
											console.log(time)
										}
									/>
								</div>
							</div>
						)}
            <Separator className='my-6' />
           <div className='flex flex-col gap-y-2 p-5 bg-gray-100 rounded-md border border-blue-500'>
            <h3 className=' font-medium text-gray-800 mb-3'>Booking summary</h3>
            <div className='flex flex-col gap-y-2'>
              <p className='text-sm text-gray-800 font-medium'>Service: <span className='text-gray-500'>Hair Cut</span></p>
              <p className='text-sm text-gray-800 font-medium'>Date: <span className='text-gray-500'>{date?.toLocaleDateString()}</span></p>
              <p className='text-sm text-gray-800 font-medium'>Time: <span className='text-gray-500'>{date?.toLocaleTimeString().slice(0, 5)}</span></p>
            </div>
           </div>
           <div className=' flex flex-col md:flex-row justify-center items-center gap-4 w-full'>
            <Button className='bg-blue-700 hover:bg-blue-800 max-w-xs text-white w-full h-12'>
              <h3>Book</h3>
            </Button>
            <Button variant='outline' onClick={onClose} className='text-gray-500 max-w-xs w-full h-12 hover:bg-gray-100 hover:text-gray-800'>
              <h3>Cancel</h3>
            </Button>
           </div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default CreateBookingForm;
