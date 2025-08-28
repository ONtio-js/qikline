import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';

interface TimePickerModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onTimeSelect: (time: string) => void;
	currentTime?: string;
}

export const TimePickerModal = ({
	open,
	setOpen,
	onTimeSelect,
	currentTime = '09:00',
}: TimePickerModalProps) => {
	const [selectedTime, setSelectedTime] = useState(currentTime);

	// Generate time options from 00:00 to 23:59 in 24-hour format
	const generateTimeOptions = () => {
		const times = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute
					.toString()
					.padStart(2, '0')}`;
				times.push(timeString);
			}
		}
		return times;
	};

	const timeOptions = generateTimeOptions();

	const handleTimeSelect = (time: string) => {
		setSelectedTime(time);
	};

	const handleConfirm = () => {
		onTimeSelect(selectedTime);
		setOpen(false);
	};

	if (!open) return null;

	return (
		<div
			onClick={(e) => {
				setOpen(false);
				e.stopPropagation();
			}}
			className='fixed top-0 left-0 z-50 bg-black/20 h-screen w-screen p-4 flex items-center justify-center'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-white w-[400px] p-6 rounded-md border border-gray-200 flex flex-col gap-y-4 shadow-md'
			>
				<div className='flex items-center justify-between'>
					<h2 className='text-gray-800 text-lg font-medium'>
						Select Time
					</h2>
					<X
						size={24}
						className='text-gray-800 cursor-pointer'
						onClick={() => setOpen(false)}
					/>
				</div>

				<div className='flex items-center gap-2 mb-4'>
					<Clock className='w-5 h-5 text-gray-500' />
					<span className='text-gray-600 font-medium'>
						Current: {selectedTime}
					</span>
				</div>

				<div className='max-h-64 overflow-y-auto border border-gray-200 rounded-lg'>
					<div className='grid grid-cols-3 gap-1 p-2'>
						{timeOptions.map((time) => (
							<button
								key={time}
								onClick={() => handleTimeSelect(time)}
								className={`p-2 text-sm rounded-md transition-colors ${
									selectedTime === time
										? 'bg-blue-700 text-white'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
							>
								{time}
							</button>
						))}
					</div>
				</div>

				<div className='flex gap-x-3 items-center justify-end pt-4'>
					<Button
						variant='outline'
						onClick={() => setOpen(false)}
						className='w-24'
					>
						Cancel
					</Button>
					<Button
						onClick={handleConfirm}
						className='w-24 bg-blue-700 hover:bg-blue-800'
					>
						Confirm
					</Button>
				</div>
			</div>
		</div>
	);
};
