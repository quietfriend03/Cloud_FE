import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_IN,
    SIGN_IN_VALIDATOR,
} from '../assets/strings';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { login } from '../utils/service';
import { toast } from 'sonner';
import OtpVerify from './otp-verify';
import { jwtDecode } from 'jwt-decode';

const formSchema = z.object({
    email: z.string({ required_error: "" }).email("Invalid email address"),
    password: z
        .string({ required_error: "" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" }),
    remember: z.boolean().default(false).optional(),
});

function Loginform({ onOtpVerificationComplete }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data.email, data.password);
            // Extract tokens from response
            const RefreshToken = response.RefreshToken;
            const IdToken = response.IdToken;
            // Decode ID token to get user data
            const decodedIdToken = jwtDecode(IdToken);
            // Store tokens and user data in local storage
            localStorage.setItem('refreshToken', RefreshToken);
            localStorage.setItem('aws_sub', decodedIdToken.sub);
            localStorage.setItem('aws_email', decodedIdToken.email);
            localStorage.setItem('expired_time', decodedIdToken.exp);
            toast.success('Login successful');
            navigate('/user'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Login failed:', error);
            if (error.message === 'User is not confirmed.') {
                setEmail(data.email); // Set email for OTP verification
                setPassword(data.password); // Set password for auto login
                setIsOtpDialogOpen(true); // Open OTP verification dialog
            } else {
                toast.error(error.message || 'Login failed');
            }
        }
    };

    const onError = error => {
        console.log(error);
    };

    const handleOtpVerificationComplete = async () => {
        try {
            const response = await login(email, password);
            console.log(response);

            // Extract tokens from response
            const RefreshToken = response.RefreshToken;
            const IdToken = response.IdToken;
            // Decode ID token to get user data
            const decodedIdToken = jwtDecode(IdToken);
            // Store tokens and user data in local storage
            localStorage.setItem('refreshToken', RefreshToken);
            localStorage.setItem('aws_sub', decodedIdToken.sub);
            localStorage.setItem('aws_email', decodedIdToken.email);

            toast.success('Login successful');
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Auto login failed:', error);
            toast.error(error.message || 'Auto login failed');
        }
    };

    return (
        <div className="flex flex-col gap-3 space-y-2 text-center">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {SIGN_IN.TITLE}
                </h1>

                <p className="text-sm text-muted-foreground">{SIGN_IN.DES}</p>
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
                                        placeholder={'Account Email'}
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
                                        autoComplete="current-password"
                                        placeholder={'Password'}
                                        onChangeCapture={e => setPassword(e.currentTarget.value)}
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
                        Sign in
                    </Button>
                </form>
            </Form>
            {isOtpDialogOpen && <OtpVerify isOpen={isOtpDialogOpen} onClose={() => setIsOtpDialogOpen(false)} email={email} onOtpVerificationComplete={handleOtpVerificationComplete} />}
        </div>
    );
}

export default Loginform;