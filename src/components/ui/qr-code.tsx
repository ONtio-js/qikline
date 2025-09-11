'use client';

import React, { useEffect, useRef, useState } from 'react';
import { generateQRCodeWithLogo, QRCodeOptions } from '@/utils/qr-code';
import Image from 'next/image';

interface QRCodeProps {
	value: string;
	size?: number;
	className?: string;
	errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
	margin?: number;
	color?: {
		dark?: string;
		light?: string;
	};
	logo?: {
		src: string;
		size?: number;
		width?: number;
		height?: number;
		margin?: number;
	};
}

const QRCodeComponent: React.FC<QRCodeProps> = ({
	value,
	size = 200,
	className = '',
	errorCorrectionLevel = 'M',
	margin = 1,
	color = {
		dark: '#000000',
		light: '#FFFFFF',
	},
	logo,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [error, setError] = useState<string | null>(null);
	const [qrDataURL, setQrDataURL] = useState<string | null>(null);

	useEffect(() => {
		const generateQRCode = async () => {
			if (!value) return;

			try {
				setError(null);

				const options: QRCodeOptions = {
					size,
					margin,
					color,
					errorCorrectionLevel,
					logo,
				};

				const result = await generateQRCodeWithLogo(value, options);
				setQrDataURL(result.dataURL);

				// If we have a canvas ref, draw the QR code to it
				if (canvasRef.current) {
					const canvas = canvasRef.current;
					const ctx = canvas.getContext('2d');

					if (ctx) {
						canvas.width = size;
						canvas.height = size;

						const img = new window.Image();
						img.onload = () => {
							ctx.drawImage(img, 0, 0, size, size);
						};
						img.src = result.dataURL;
					}
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to generate QR code'
				);
				console.error('QR Code generation error:', err);
			}
		};

		generateQRCode();
	}, [value, size, margin, color, errorCorrectionLevel, logo]);

	if (error) {
		return (
			<div
				className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 ${className}`}
				style={{ width: size, height: size }}
			>
				<p className='text-sm text-gray-500 text-center p-2'>
					Error generating QR code
				</p>
			</div>
		);
	}

	return (
		<div className={`inline-block ${className}`}>
			{qrDataURL ? (
				<Image
					src={qrDataURL}
					width={size}
					height={size}
					alt='QR Code'
					style={{ width: size, height: size }}
					className='border border-gray-200 rounded-lg'
				/>
			) : (
				<canvas
					ref={canvasRef}
					style={{ width: size, height: size }}
					className='border border-gray-200 rounded-lg'
				/>
			)}
		</div>
	);
};

export default QRCodeComponent;
