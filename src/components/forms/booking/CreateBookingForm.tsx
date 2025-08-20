import { X } from 'lucide-react';
import React from 'react'
import { Select, SelectValue, SelectTrigger } from '@/components/ui/select';
type CreateBookingFormProps = {
    isOpen: boolean;
    onClose: () => void;
}
const CreateBookingForm = ({isOpen, onClose}: CreateBookingFormProps) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/20 z-50 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className='w-full h-[85%] bg-white rounded-3xl bottom-0 absolute p-6 space-y-6'>
        <div className='flex justify-between items-center '>
            <h4 className='text-lg font-medium'>New Booking</h4>
            <X size={20} onClick={onClose} className='cursor-pointer hover:text-gray-500 transition-all duration-300 text-gray-400' />
        </div>
        <div className='space-y-2 w-full'>
            <h4 className='text-sm font-medium text-gray-700'>Select Service</h4>
            <Select
                onValueChange={(value) => console.log(value)}

            >
                <SelectTrigger className='w-full' style={{height: '50px'}}>
                    <SelectValue placeholder='Select a service' />
                </SelectTrigger>
            </Select>
        </div>
      </div>
    </div>
  )
}

export default CreateBookingForm