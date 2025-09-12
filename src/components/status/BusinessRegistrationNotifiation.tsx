import React, { useState, useEffect } from 'react';
import QRCodeComponent from '../ui/qr-code';
import { generateBusinessQRCodeWithLogo } from '../../utils/qr-code';
import { CopyIcon, X } from 'lucide-react';
import { toast } from 'sonner';

interface BusinessRegistrationNotificationProps {
	businessName: string;
	businessId: string;
	isOpen: boolean;
	onClose: () => void;
}

const BusinessRegistrationNotifiation = ({
	businessName,
	businessId,
	isOpen,
	onClose,
}: BusinessRegistrationNotificationProps) => {
	const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
	const [bookingURL, setBookingURL] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isOpen && businessId && !qrCodeDataURL) {
			generateQRCode();
		}
	}, [isOpen, businessId,qrCodeDataURL]);

	const generateQRCode = async () => {
		setIsLoading(true);
		try {
			const result = await generateBusinessQRCodeWithLogo(businessId, {
				size: 200,
				color: {
					dark: '#000000',
					light: '#FFFFFF',
				},
				logo: {
					src: '/qikline.JPG',
					width: 80,
					height: 40,
					margin: 2,
				},
			});
			setQrCodeDataURL(result.dataURL);
			setBookingURL(
				result.dataURL.split(',')[0]
					? `https://qikline.com/businesses/${businessId}`
					: ''
			);
		} catch (error) {
			console.error('Failed to generate QR code:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const downloadQRCode = () => {
		if (qrCodeDataURL) {
			const link = document.createElement('a');
			link.download = `${businessName}-qr-code.png`;
			link.href = qrCodeDataURL;
			link.click();
		}
	};

	return (
		<div
			className={`z-10 fixed top-0 left-0 bg-gradient-to-t h-screen w-screen from-[#F1D5FF] to-[#EFF7FF] p-10 flex items-center justify-center ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<p
				className='absolute top-10 right-10 flex items-center gap-x-2'
				onClick={onClose}
			>
				<X className='w-4 h-4 cursor-pointer group-hover:text-red-500 hover:scale-110 transition-all duration-300' />
				close
			</p>
			<div className='w-full  md:max-w-2xl mx-auto flex flex-col items-center justify-center'>
				<div className='text-center mb-8 mt-20'>
					<h2 className='md:text-3xl text-xl font-bold text-gray-800 mb-4'>
						Welcome to QikLine, {businessName}!
					</h2>
					<p className='text-gray-600 md:text-lg text-base mb-4 font-medium'>
						Your business profile is now live on QikLine.
					</p>
					<p className='text-gray-600 md:text-lg text-base mb-4 font-medium'>
						Share your booking link and QR code with your customers
						so they can book appointments instantly.
					</p>
				</div>

				<div className='  md:p-6 p-2 mb-6'>
					<div className='flex flex-col items-center space-y-4'>
						{isLoading ? (
							<div className='w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center'>
								<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
							</div>
						) : (
							<QRCodeComponent
								value={`https://qikline.com/businesses/${businessId}`}
								size={200}
								color={{
									dark: '#000000',
									light: '#FFFFFF',
								}}
								logo={{
									src: '/qikline.JPG',
									width: 80,
									height: 40,
									margin: 2,
								}}
								errorCorrectionLevel='H'
								className='shadow-lg'
							/>
						)}

						<button
							onClick={downloadQRCode}
							disabled={isLoading || !qrCodeDataURL}
							className='px-6 py-2 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							Download QR Code
						</button>
                        <div className='flex items-center md:flex-row flex-col justify-between gap-2'>
                            <p className='text-gray-600 md:text-sm text-xs'>
                                Booking URL: {bookingURL}
                            </p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(bookingURL);
                                    toast.success('Booking URL copied to clipboard');
                                }}
                                className='text-blue-600 md:text-sm text-xs cursor-pointer'
                            >
                                <CopyIcon className='w-5 h-5' />
                               
                            </button>
                        </div>
                        
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessRegistrationNotifiation;
