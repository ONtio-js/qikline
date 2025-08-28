import React from 'react';
import BookForm from '../forms/booking/BookForm';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingFormProps {
	customerId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	serviceId: string;
	serviceName: string;
	time: string;
	date: Date;
	onClose: () => void;
	isOpen: boolean;
	business:
		| {
				id: number;
				services: {
					id: number;
					name: string;
				}[];
		  }
		| undefined;
}

export const BookingForm = ({
	customerId,
	customerName,
	customerEmail,
	customerPhone,
	time,
	date,
	isOpen,
	onClose,
	business,
}: BookingFormProps) => {
	console.log(
		customerId,
		customerName,
		customerEmail,
		customerPhone,
		time,
		date,
		isOpen,
		onClose,
		business
	);
	return (
		<div
			className={`md:hidden fixed top-0 right-0 w-full h-full bg-black/10 z-50 backdrop-blur ${
				isOpen ? 'block' : 'hidden'
			}`}
			onClick={onClose}
		>
			<motion.div
				className='w-full h-[85vh] p-10 bg-white absolute bottom-0 right-0 rounded-t-2xl overflow-y-auto no-scrollbar'
				onClick={(e) => e.stopPropagation()}
				initial={{ y: '100%' }}
				whileInView={{ y: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
			>
				<div className='flex items-center justify-between'>
					<h1 className=' font-medium'> Book Appointment</h1>
					<Button
						variant='outline'
						className='rounded-full border-none'
						onClick={onClose}
					>
						<X className='w-5 h-5' />
					</Button>
				</div>
				<BookForm business={business} />
			</motion.div>
		</div>
	);
};

export default BookingForm;
