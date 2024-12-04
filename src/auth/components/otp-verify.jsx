import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function OtpVerify({ isOpen, onClose }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        // Add OTP verification logic here
        onClose(); // Close the dialog after successful OTP verification
    };

    const handleChange = (value) => {
        form.setValue('pin', value);
        if (value.length === 6) {
            form.handleSubmit(onSubmit)();
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
                                            <Input
                                                type="text"
                                                value={field.value}
                                                onChange={(e) => handleChange(e.target.value)}
                                                placeholder="Enter 6-digit OTP"
                                                maxLength={6}
                                                className="border border-black/20 focus:border-transparent"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="inline-flex h-8 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200"
                            >
                                Verify OTP
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default OtpVerify;