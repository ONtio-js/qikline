import React, { useEffect, useState } from 'react';
import BookForm from '../forms/booking/BookForm';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
					duration: number;
					price: number;
				}[];
		  }
		| undefined;
}

export const BookingForm = ({
	
	isOpen,
	onClose,
	business,
}: BookingFormProps) => {
	const [, setIsVisible] = useState(false);
	const [isSafari,] = useState(false);



	useEffect(() => {
		if (isOpen) {
			
			if (isSafari) {
				setIsVisible(true);
			} else {
				
				const timer = setTimeout(() => setIsVisible(true), 10);
				return () => clearTimeout(timer);
			}
		} else {
			setIsVisible(false);
		}
	}, [isOpen, isSafari]);

	

	
	if (isSafari) {
		if (!isOpen) return null;

		return (
			<div
				className='md:hidden fixed top-0 right-0 w-full h-full z-50 bg-black/20'
				onClick={onClose}
				style={{
					WebkitOverflowScrolling: 'touch',
					WebkitTransform: 'translateZ(0)',
					transform: 'translateZ(0)',
				}}
			>
				<div
					className='w-full h-[85vh] p-10 bg-white absolute bottom-0 right-0 rounded-t-2xl overflow-y-auto no-scrollbar safari-overflow-fix'
					onClick={(e) => e.stopPropagation()}
					style={{
						WebkitTransform: 'translate3d(0, 0, 0)',
						transform: 'translate3d(0, 0, 0)',
						WebkitBackfaceVisibility: 'hidden',
						backfaceVisibility: 'hidden',
					}}
				>
					<div className='flex items-center justify-between'>
						<h1 className='font-medium'> Book Appointment</h1>
						<Button
							variant='outline'
							className='rounded-full border-none'
							onClick={onClose}
							style={{
								WebkitAppearance: 'none',
								WebkitTapHighlightColor: 'transparent',
							}}
						>
							<X className='w-5 h-5' />
						</Button>
					</div>
					<BookForm business={business} />
				</div>
			</div>
		);
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<div
					className='md:hidden fixed top-0 right-0 w-full h-full z-50 bg-black/10 backdrop-blur'
					onClick={onClose}
				>
					<motion.div
						className='w-full h-[85vh] p-10 bg-white absolute bottom-0 right-0 rounded-t-2xl overflow-y-auto no-scrollbar'
						onClick={(e) => e.stopPropagation()}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
							delay: 0.1,
						}}
					>
						<div className='flex items-center justify-between'>
							<h1 className='font-medium'> Book Appointment</h1>
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
			)}
		</AnimatePresence>
	);
};

export default BookingForm;
