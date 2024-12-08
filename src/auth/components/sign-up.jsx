import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_UP,
    SIGN_UP_VALIDATOR,
} from '../assets/strings';
import { signup } from '../utils/service';
import { toast } from 'sonner';
import OtpVerify from './otp-verify';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

function Signupform({ onSignUpComplete }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await signup(data.email, data.password);
            console.log(response);
            toast.success('Account has been created');
            setEmail(data.email); // Set email for OTP verification
            setIsOtpDialogOpen(true); // Open OTP verification dialog
        } catch (error) {
            console.error('Sign up failed:', error);
            toast.error(error.message || 'Sign up failed');
        }
    };

    const onError = error => {
        console.log(error);
    };

    const handleOtpVerificationComplete = () => {
        setIsOtpDialogOpen(false);
        onSignUpComplete(); // Trigger the callback to show the login form
    };

    return (
        <div className="flex flex-col gap-3 space-y-2 text-center">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {SIGN_UP.TITLE}
                </h1>
                <p className="text-sm text-muted-foreground">{SIGN_UP.DES}</p>
            </div>
            <Form {...form}>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="email"
                                        value={email}
                                        placeholder="Account Email"
                                        autoComplete="email"
                                        onChangeCapture={e => setEmail(e.currentTarget.value)}
                                        className="border border-black/20 focus:border-transparent"
                                        {...field}
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
                                <FormControl>
                                    <Input
                                        type="password"
                                        value={password}
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        onChangeCapture={e => setPassword(e.currentTarget.value)}
                                        className="border border-black/30 focus:border-transparent"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        autoComplete="new-password"
                                        placeholder="Confirm Password"
                                        onChangeCapture={e => setConfirmPassword(e.currentTarget.value)}
                                        className="border border-black/30 focus:border-transparent"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="inline-flex h-8 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200"
                    >
                        Sign up
                    </Button>
                </form>
            </Form>
            {isOtpDialogOpen && <OtpVerify isOpen={isOtpDialogOpen} onClose={() => setIsOtpDialogOpen(false)} email={email} onOtpVerificationComplete={handleOtpVerificationComplete} />}
        </div>
    );
}

export default Signupform;