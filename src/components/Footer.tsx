import React from 'react'
import Logo from './Logo'
import Link from 'next/link';
import { FacebookIcon, LinkedinIcon, Twitter } from 'lucide-react';

const Footer = () => {
  return (
		<footer className='md:px-10 lg:p-20 py-20 px-5'>
			<div className='grid grid-cols-1 md:grid-cols-5 '>
				<div className='col-span-2 space-y-5 mr-10'>
					<Logo />
					<p className='max-w-[20rem] text-gray-600 text-lg mt-3'>
						Connecting customers with Verified service providers
						through seamless appointment booking.
					</p>
				</div>
				<div className='col-span-2 md:col-span-1'>
					<h3 className='font-semibold text-xl py-5'>Product</h3>
					<ul className='space-y-2 text-gray-700 capitalize text-lg'>
						<li>
							<Link href=''>How it works</Link>
						</li>
						<li>
							<Link href=''>For Businesses</Link>
						</li>
						<li>
							<Link href=''>For Customers</Link>
						</li>
						<li>
							<Link href=''>Pricing</Link>
						</li>
					</ul>
				</div>
				<div className='col-span-2 md:col-span-1'>
					<h3 className='font-semibold text-xl py-5'>Company</h3>
					<ul className='space-y-2 text-gray-700 capitalize text-lg'>
						<li>
							<Link href=''>about</Link>
						</li>
						<li>
							<Link href=''>Contact</Link>
						</li>
						<li>
							<Link href=''>FAQ</Link>
						</li>
						<li>
							<Link href=''>Support</Link>
						</li>
					</ul>
				</div>
				<div className='col-span-1'>
					<h3 className='font-semibold text-xl py-5'>Legal</h3>
					<ul className='space-y-2 text-gray-700 capitalize text-lg'>
						<li>
							<Link href=''>Privacy Policy</Link>
						</li>
						<li>
							<Link href=''>terms of service</Link>
						</li>
						<li>
							<Link href=''>Cookie Policy</Link>
						</li>
						
					</ul>
				</div>
			</div>
            <hr className='mt-20'/>
            <div className='flex flex-col md:flex-row md:items-center  gap-y-5 justify-between pt-5'>
                <p>
                    &copy; {new Date().getFullYear()} QikLine. All rights reserved
                </p>
                <div className='flex items-center gap-5 '>
                    <FacebookIcon className='text-gray-600' /> <Twitter  className='text-gray-600'/> <LinkedinIcon className='text-gray-600'/>
                </div>
            </div>
		</footer>
  );
}

export default Footer