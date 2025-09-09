"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HomeHeaderActions() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This code runs only on the client
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-4">
                <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />
                <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
            </div>
        );
    }

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-4">
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>Log Out</Button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Sign Up</Link>
            </Button>
        </div>
    );
}
