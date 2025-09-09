import { Calendar1Icon, FlashlightIcon, LucideLayoutDashboard, SearchIcon,  TrendingUp, Users } from 'lucide-react';

export const howItWorks = [
	{
		id: 1,
		title: 'Search Verified  Businesses',
		description:
			'Browse local service providers and read reviews from real customers.',
		icon: <SearchIcon />,
	},
	{
		id: 2,
		title: 'Pick a slot that fits',
		description:
			'Select from available time slots that work with your schedule.',
		icon: <Calendar1Icon />,
	},
	{
		id: 3,
		title: 'Book and Pay Securely',
		description:
			'Browse local service providers and read reviews from real customers.',
		icon: <FlashlightIcon />,
	},
];
export const features = [
	{
		id: 1,
		title: 'Smart Scheduling',
		description: 'Sync  booking system that works with your calendar',
		icon: <Calendar1Icon />,
	},
	{
		id: 2,
		title: 'Customer Management',
		description: 'Track customer history and preferences in one place',
		icon: <Users />,
	},
	{
		id: 3,
		title: ' Revenue Growth',
		description: 'Increase bookings by up to 40% with our platform',
		icon: <TrendingUp />,
	},
	{
		id: 4,
		title: 'Analytics Dashboard',
		description: 'Insights to help optimize your business operations',
		icon: <LucideLayoutDashboard />,
	},
];

export const businesses = [
	{
		id: 1,
		name: 'Business 1o',
		description: 'Description 1',
		image: '/hero-1.png',
		location: 'Location 1',
		category: ['Category 1'],
		rating: 1,
		address: 'Address 1',
		city: 'City 1',
		state: 'State 1',
		images: [{ id: 1, image: '/hero-1.png' }],
	},
	{
		id: 2,
		name: 'Business 2',
		description: 'Description 2',
		image: '/hero-1.png',
		location: 'Location 2',
		category: ['Category 2'],
		rating: 2,
		address: 'Address 2',
		city: 'City 2',
		state: 'State 2',
		images: [{ id: 2, image: '/hero-1.png' }],
	},
	{
		id: 3,
		name: 'Business 3',
		description: 'Description 3',
		image: '/hero-1.png',
		location: 'Location 3',
		category: ['Category 3'],
		rating: 3,
		address: 'Address 3',
		city: 'City 3',
		state: 'State 3',
		images: [{ id: 3, image: '/hero-1.png' }],
	},
];