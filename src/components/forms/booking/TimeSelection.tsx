import { Clock } from 'lucide-react';
import React from 'react';
import { UseFormReturn, ControllerRenderProps } from 'react-hook-form';

interface TimeSelectionProps {
	field: ControllerRenderProps<
		{
			time: string;
			name: string;
			date: string;
			service: string;
			email: string;
			phone: string;
			notes: string | null;
		},
		'time'
	>;
	form: UseFormReturn<{
		time: string;
		name: string;
		date: string;
		service: string;
		email: string;
		phone: string;
		notes: string | null;
	}>;
}

const TimeSelection = ({ field, form }: TimeSelectionProps) => {
	// Generate time options in 30-minute increments (12-hour format)
	const generateTimeOptions = () => {
		const times: string[] = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const time = new Date();
				time.setHours(hour, minute, 0, 0);
				const timeString = time.toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				});
				times.push(timeString);
			}
		}
		return times;
	};

	const timeOptions = generateTimeOptions();
	return (
		<div className='grid grid-cols-3 gap-2 p-2'>
			{timeOptions.map((time) => (
				<button
					key={time}
					onClick={(e) => {
						e.preventDefault();
						field.onChange(time);
						form.setValue('time', time);
					}}
					className={`p-2  rounded-md transition-colors border flex items-center gap-x-2 justify-center ${
						field.value === time
							? 'bg-blue-700 text-white'
							: 'text-gray-700 hover:bg-gray-100'
					}`}
				>
					<Clock className='w-6 h-6 text-gray-400' /> {time}
				</button>
			))}
		</div>
	);
};

export default TimeSelection;
