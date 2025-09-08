import {  CheckCircleIcon, CopyIcon, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
type ServiceData = {
	id: number;
	name: string;
	category: string;
	category_display: string;
	description: string;
	duration: number;
	is_active: boolean;
	price: string;
	created_at: string;
	updated_at: string;
};

type BookingData = {
	id: number;
	business_name: string;
	created_at: string;
	date: string;
	time: string;
	service: ServiceData;
	status: string;
	status_display: string;
	tracking_id: string;
	updated_at: string;
} | null;

const RescheduleConfirmation = ({ onClose, bookingData }: { onClose: () => void, bookingData: BookingData }) => {
  return (
    <div
			onClick={(e) => e.stopPropagation()}
			className='w-[90%] md:w-2xl bg-white rounded-lg px-5 py-10 md:p-10 overflow-y-auto no-scrollbar max-h-[80vh] h-fit'
		>
			<div className='flex items-center justify-end'>
			
                   < X className='w-5 h-5' onClick={onClose} />
			</div>
            <div className='space-y-1'>
                <div className='flex items-center justify-center bg-emerald-500/10 rounded-full p-3 w-fit mx-auto'>
                    <CheckCircleIcon className='w-7 h-7 text-emerald-700' />
                </div>
                <h1 className='text-gray-800 font-semibold text-lg text-center mt-4'>Appointment Rescheduled</h1>
                <p className='text-gray-500 text-sm text-center'>Your appointment has been successfully updated.</p>
            </div>
            <div className='border border-gray-200 rounded-lg p-5 mt-10 space-y-2'>
                <h3 className='text-gray-600 font-medium'>
                    Updated Appointment Details
                </h3>
               <div className='flex items-center justify-between'><p className='text-gray-600'>Booking ID:</p> <p className='text-blue-700 font-medium flex items-center gap-x-2'>{bookingData?.tracking_id || 'N/A'} <CopyIcon className='w-5 h-5 text-gray-500' onClick={() => {
                navigator.clipboard.writeText(bookingData?.tracking_id || '');
                toast.success('Booking ID copied to clipboard', {
                    duration: 3000,
                    position: 'top-right',
                });
               }} /></p>
                </div>
                <div className='flex items-center justify-between'><p className='text-gray-600'>Service:</p> <p className='text-gray-800 font-medium'>{bookingData?.service?.name || 'N/A'}</p>
                </div>
                <div className='flex items-center justify-between'><p className='text-gray-600'>New Date:</p> <p className='text-gray-800 font-medium'>{bookingData?.date || 'N/A'}</p>
                </div>
                <div className='flex items-center justify-between'><p className='text-gray-600'>New Time:</p> <p className='text-gray-800 font-medium'>{bookingData?.time || 'N/A'}</p>
                </div>
            </div>
		</div>
  )
}

export default RescheduleConfirmation