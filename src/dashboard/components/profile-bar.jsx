import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventSheet } from "./event-sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function ProfileBar({ events }) {
    const email = localStorage.getItem('aws_email');

    const handleLogout = () => {
        localStorage.removeItem('aws_email');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('aws_sub');
        localStorage.removeItem('expired_time');
        // Add any other local storage keys you want to remove
        window.location.reload(); // Reload the page or navigate to the login page
    };

    return (
        <div className="p-[10px] border-r h-screen space-y-2 flex flex-col">
            <div className="flex justify-between items-center align-middle gap-4 pb-2 hover:bg-slate-200 cursor-pointer rounded-md p-2 border-b">
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <p className="text-ellipsis overflow-auto font-semibold">{email}</p>
            </div>
            <EventSheet events={events} />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Log out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. And you will be logged out.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}