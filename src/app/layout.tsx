import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'QikLine | A smart booking platform for services near me',
	description:
		'Book services near you with QikLine, a smart booking platform for services near you with QikLine you can book services near you with ease',
	keywords: [
		'QikLine',
		'Booking',
		'Services',
		'Near Me',
		'Smart Booking',
		'Booking Platform',
		'barber',
		'nail',
		'hair',
		'beauty',
		'spa',
		'massage',
		'therapy',
		'salon near me',
		'barber near me',
		'beautician near me',
		'hairdresser near me',
		'massage therapist near me',
		'nail technician near me',
		'beauty therapist near me',
		'spa near me',
		'salon near me',
		'barber near me',
		'beautician near me',
		'hairdresser near me',
		'massage therapist near me',
		'nail technician near me',
		'beauty therapist near me',
		'spa near me',
	],
	authors: [{ name: 'QikLine', url: 'https://qikline.com' }],
	metadataBase: new URL('https://qikline.com'),
	openGraph: {
		title: 'QikLine | A smart booking platform for services near me',
		description:
			'Book services near you with QikLine, a smart booking platform for services near you with QikLine you can book services near you with ease',
		images: ['https://qikline.com/og-image.png'],
		locale: 'en_US',
		type: 'website',
		url: 'https://qikline.com',
		siteName: 'QikLine',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'QikLine | A smart booking platform for services near me',
		description:
			'Book services near you with QikLine, a smart booking platform for services near you with QikLine you can book services near you with ease',
		images: ['https://qikline.com/og-image.png'],
		site: 'https://qikline.com',
		creator: 'QikLine',
		creatorId: 'QikLine',
	},
	
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white `}
			>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
