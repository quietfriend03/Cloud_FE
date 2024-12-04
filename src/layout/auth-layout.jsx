import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const LandingAuthLayout = () => {
    return (
        <div className="relative min-h-screen">
            <Outlet />
            <Toaster />
        </div>
    );
};
