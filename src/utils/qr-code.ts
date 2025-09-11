import QRCode from 'qrcode';

export interface QRCodeOptions {
	size?: number;
	margin?: number;
	color?: {
		dark?: string;
		light?: string;
	};
	errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
	logo?: {
		src: string;
		size?: number;
		width?: number;
		height?: number;
		margin?: number;
	};
}

export interface QRCodeDataURL {
	dataURL: string;
	size: number;
}

export const generateQRCodeDataURL = async (
	text: string,
	options: QRCodeOptions = {}
): Promise<QRCodeDataURL> => {
	const {
		size = 200,
		margin = 1,
		color = { dark: '#000000', light: '#FFFFFF' },
		errorCorrectionLevel = 'M',
	} = options;

	try {
		const dataURL = await QRCode.toDataURL(text, {
			width: size,
			margin: margin,
			color: color,
			errorCorrectionLevel: errorCorrectionLevel,
		});

		return { dataURL, size };
	} catch (error) {
		throw new Error(
			`Failed to generate QR code: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const generateQRCodeSVG = async (
	text: string,
	options: QRCodeOptions = {}
): Promise<string> => {
	const {
		size = 200,
		margin = 1,
		color = { dark: '#000000', light: '#FFFFFF' },
		errorCorrectionLevel = 'M',
	} = options;

	try {
		const svg = await QRCode.toString(text, {
			type: 'svg',
			width: size,
			margin: margin,
			color: color,
			errorCorrectionLevel: errorCorrectionLevel,
		});

		return svg;
	} catch (error) {
		throw new Error(
			`Failed to generate QR code SVG: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

/**
 * Generate QR code as PNG buffer
 */
export const generateQRCodeBuffer = async (
	text: string,
	options: QRCodeOptions = {}
): Promise<Buffer> => {
	const {
		size = 200,
		margin = 1,
		color = { dark: '#000000', light: '#FFFFFF' },
		errorCorrectionLevel = 'M',
	} = options;

	try {
		const buffer = await QRCode.toBuffer(text, {
			width: size,
			margin: margin,
			color: color,
			errorCorrectionLevel: errorCorrectionLevel,
		});

		return buffer;
	} catch (error) {
		throw new Error(
			`Failed to generate QR code buffer: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const generateBookingURL = (
	businessId: string,
	baseUrl?: string
): string => {
	const base =
		baseUrl ||
		(typeof window !== 'undefined' ? window.location.origin : '');
	return `${base}/businesses/${businessId}`;
};

export const generateQRCodeWithLogo = async (
	text: string,
	options: QRCodeOptions = {}
): Promise<QRCodeDataURL> => {
	const {
		size = 200,
		margin = 1,
		color = { dark: '#000000', light: '#FFFFFF' },
		errorCorrectionLevel = 'H',
		logo,
	} = options;

	try {
		const qrDataURL = await QRCode.toDataURL(text, {
			width: size,

			margin: margin,
			color: color,
			errorCorrectionLevel: errorCorrectionLevel,
		});

		if (!logo) {
			return { dataURL: qrDataURL, size };
		}

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('Failed to get canvas context');
		}

		canvas.width = size;
		canvas.height = size;

		const qrImage = new Image();
		await new Promise((resolve, reject) => {
			qrImage.onload = resolve;
			qrImage.onerror = reject;
			qrImage.src = qrDataURL;
		});

		ctx.drawImage(qrImage, 0, 0, size, size);

		const logoImage = new Image();
		await new Promise((resolve, reject) => {
			logoImage.onload = resolve;
			logoImage.onerror = reject;
			logoImage.src = logo.src;
		});

		let logoWidth: number;
		let logoHeight: number;

		if (logo.width && logo.height) {
			logoWidth = logo.width;
			logoHeight = logo.height;
		} else if (logo.size) {
			logoWidth = logo.size;
			logoHeight = logo.size;
		} else {
			const defaultSize = size * 0.2;
			const aspectRatio = logoImage.width / logoImage.height;

			if (aspectRatio > 1) {
				logoWidth = defaultSize;
				logoHeight = defaultSize / aspectRatio;
			} else {
				logoHeight = defaultSize;
				logoWidth = defaultSize * aspectRatio;
			}
		}

		const logoMargin = logo.margin || 10;

		const logoX = (size - logoWidth) / 2;
		const logoY = (size - logoHeight) / 2;

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(
			logoX - logoMargin,
			logoY - logoMargin,
			logoWidth + logoMargin * 2,
			logoHeight + logoMargin * 2
		);

		ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

		return { dataURL: canvas.toDataURL(), size };
	} catch (error) {
		throw new Error(
			`Failed to generate QR code with logo: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const generateBusinessQRCodeWithLogo = async (
	businessId: string,
	options: QRCodeOptions = {}
): Promise<QRCodeDataURL> => {
	const bookingURL = generateBookingURL(businessId);

	const defaultOptions: QRCodeOptions = {
		logo: {
			src: '/qikline-logo.svg',
			size: undefined,
			margin: 8,
		},
		errorCorrectionLevel: 'H',
		...options,
	};

	return generateQRCodeWithLogo(bookingURL, defaultOptions);
};

export const generateBusinessQRCode = async (
	businessId: string,
	options: QRCodeOptions = {}
): Promise<QRCodeDataURL> => {
	const bookingURL = generateBookingURL(businessId);
	return generateQRCodeDataURL(bookingURL, options);
};
