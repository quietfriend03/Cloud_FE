import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { refresh } from '@/auth/utils/service';
import { jwtDecode } from 'jwt-decode';
import { Loader2 } from 'lucide-react';

// Function to check if the token is expired
const isExpired = () => {
    const expiration_time = localStorage.getItem('expired_time');
    if (!expiration_time) {
        return true; // If there's no expiration, treat it as expired
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return expiration_time < currentTime; // Compare token's expiration time with current time
};

// Protect routes by requiring authentication
export const RequireAuth = () => {
    // Get the token from localStorage
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const refreshToken = localStorage.getItem('refreshToken');
    const sub = localStorage.getItem('aws_sub');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (!refreshToken || isExpired()) {
                try {
                    const response = await refresh(sub, refreshToken);
                    const IdToken = response.idToken;
                    const expiration_time = jwtDecode(IdToken).exp;
                    localStorage.setItem('expired_time', expiration_time);
                    setAuthenticated(true);
                } catch (error) {
                    navigate('/auth', { state: { from: location }, replace: true });
                }
            } else {
                setAuthenticated(true);
            }
            setLoading(false); // Stop loading once the check is done
        };

        checkAuth();
    }, [refreshToken, sub, location, navigate]);

    // Show spinner if still loading
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span className="text-lg font-medium">Please wait...</span>
            </div>
        );
    }

    // Redirect to /user if authenticated and not already on /user
    if (authenticated && location.pathname !== '/user') {
        return <Navigate to="/user" state={{ from: location }} replace />;
    }

    return <Outlet />;
};