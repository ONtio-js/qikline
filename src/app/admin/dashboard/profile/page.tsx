import Profilesetting from "@/components/forms/settings/profile";
import SeccuritySetting from "@/components/forms/settings/SeccuritySetting";
import KycSettings from "@/components/forms/settings/KycSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
	return (
		<div>
			<h2 className='pl-6 pt-6 text-xl font-semibold text-gray-800 capitalize'>
				{' '}
				profile Settings
			</h2>
			<p className='pl-6  text-gray-500'>
				Manage your personal profile and security Information here.
			</p>
			<div>
				<div>
					<Tabs
						defaultValue='profile'
						className='w-full  '
					>
						<div className='flex overflow-x-hidden items-center justify-between px-6 pt-6'>
							<TabsList className='overflow-x-scroll flex justify-start h-13 bg-gray-100 px-2 rounded-md w-full md:w-[500px] no-scrollbar'>
								<TabsTrigger
									value='profile'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Profile
								</TabsTrigger>
								<TabsTrigger
									value='security'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Security
								</TabsTrigger>
								<TabsTrigger
									value='kyc'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									KYC
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent
							value='profile'
							className='p-6'
						>
							<Profilesetting />
						</TabsContent>
						<TabsContent
							value='security'
							className='p-6'
						>
							<SeccuritySetting />
						</TabsContent>
						<TabsContent
							value='kyc'
							className='p-6'
						>
							<KycSettings />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage