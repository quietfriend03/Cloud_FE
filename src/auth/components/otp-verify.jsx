import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { verify, resend } from '../utils/service';
import { toast } from 'sonner';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function OtpVerify({ isOpen, onClose, email, onOtpVerificationComplete }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await verify(email, data.pin);
            console.log(response);
            toast.success('OTP verified successfully');
            onClose(); // Close the dialog after successful OTP verification
            onOtpVerificationComplete(); // Trigger the callback to auto login or show login form
        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error(error.message || 'OTP verification failed');
        }
    };

    const handleResend = async () => {
        try {
            const response = await resend(email);
            console.log(response);
            toast.success('OTP resent successfully');
        } catch (error) {
            console.error('Resend OTP failed:', error);
            toast.error(error.message || 'Resend OTP failed');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>OTP Verification</DialogTitle>
                    <DialogDescription>
                        Please enter your verification code to continue.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-6">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4 w-[80%] justify-between">
                                <Button
                                    type="submit"
                                    className="inline-flex h-8 items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200 w-1/2"
                                >
                                    Verify OTP
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleResend}
                                    className="inline-flex h-8 items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200 w-1/2"
                                >
                                    Resend OTP
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default OtpVerify;