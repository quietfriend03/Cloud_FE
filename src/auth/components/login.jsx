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
import { Loader2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { login } from '../utils/service';

const formSchema = z.object({
    email: z.string({ required_error: "" }).email("Invalid email address"),
    password: z
        .string({ required_error: "" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" }),
    remember: z.boolean().default(false).optional(),
});

function Loginform() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            console.log(data);
            const response = await login(data.email, data.password);
            console.log(response);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const onError = error => {
        console.log(error);
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
        </div>
    );
}

export default Loginform;