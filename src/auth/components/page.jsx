import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AuthBackground from '../assets/bgimg.png';
import { QUOTE, WEB_BRIEF_INTRO } from '../assets/strings';
import Loginform from './login';
import Signupform from './sign-up';

export const Page = () => {
    const [isUserLogin, setIsUserLogin] = useState(true);

    const divStyle = {
        backgroundImage: `url(${AuthBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    const handleToggleLoginState = () => {
        setIsUserLogin(true);
    };

    return (
        <div>
            {/* Side Background */}
            <div className="md:hidden">
                <div style={divStyle} alt="Authentication" className="block" />
            </div>

            <div className="container relative hidden min-h-screen w-15 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Button
                    href="/login"
                    className="absolute right-4 top-4 md:right-8 md:top-8"
                    onClick={() => setIsUserLogin(!isUserLogin)}
                >
                    {isUserLogin ? 'Create account' : 'Sign In'}
                </Button>

                {/* Side panel */}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0" style={divStyle} />

                    <div className="relative z-20 mt-auto">
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold">
                                {'Welcome to our website'}
                            </h1>

                            <h1 className="text-lg">{WEB_BRIEF_INTRO}</h1>
                        </div>

                        <blockquote className="space-y-2">
                            <p className="text-xl italic">{`“${QUOTE.CONTENT}”`}</p>

                            <footer className="text-lg font-semibold">
                                {' '}
                                {QUOTE.BY}{' '}
                            </footer>
                        </blockquote>
                    </div>
                </div>

                {/* Auth Form */}
                <div className="lg:p-8 flex justify-center items-center w-full">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {isUserLogin ? (
                            <Loginform />
                        ) : (
                            <Signupform
                                onSignUpComplete={handleToggleLoginState}
                            />
                        )}
                        <div className="relative">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
