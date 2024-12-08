import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const AppLayout = () => {
    return (
        <div className="w-screen h-screen">
            <Outlet />
        </div>
    );
};
