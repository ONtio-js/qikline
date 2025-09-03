'use client'
import React from 'react';
import { securitySettingSchema } from '../../../../schema/schema';
// import { useForm } from 'react-hook-form';
import { useForm as useFormHook } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SeccuritySetting = () => {
    const form = useFormHook<z.infer<typeof securitySettingSchema>>({
        resolver: zodResolver(securitySettingSchema),
        defaultValues: {
            two_factor_enabled: false,
            two_factor_secret: '',
            two_factor_recovery_codes: '',
            password: '',
            confirm_password: '',
            old_password: '',
        },
    });
    const onSubmit = (data: z.infer<typeof securitySettingSchema>) => {
        console.log(data);
    };
	return (
		<div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1000px]  border border-gray-200 rounded-md p-4">
                <FormField
                    control={form.control}
                    name="two_factor_enabled"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Two Factor Enabled</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="two_factor_secret"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Two Factor Secret</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ''}
                                    className='w-full h-12'
                                    placeholder='Enter your two factor secret'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="two_factor_recovery_codes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Two Factor Recovery Codes</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ''}
                                    className='w-full h-12'
                                    placeholder='Enter your two factor recovery codes'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='w-full h-12'
                                    placeholder='Enter your new password'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ''}
                                    className='w-full h-12'
                                    placeholder='Enter your confirm password'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="old_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ''}
                                    className='w-full h-12'
                                    placeholder='Enter your old password'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='flex flex-col justify-center md:flex-row gap-4 mt-4'>
                    <Button type='submit' className='w-full h-12 bg-blue-700 text-white mx-auto md:max-w-xs'>Save</Button>
                </div>
			</form>
		</Form>
	</div>
);
};

export default SeccuritySetting;