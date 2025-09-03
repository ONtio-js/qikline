import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['qikline-backend.onrender.com', 'localhost'],
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://qikline-backend.onrender.com;",
						
					},
				
				],
				
			},
		];
	},
	// devIndicators:false
};

export default nextConfig;
