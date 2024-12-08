import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventSheet } from "./event-sheet";

export function ProfileBar({ events }) {
    const email = localStorage.getItem('aws_email');
    return (
        <div className="p-[10px] border-r h-screen space-y-2">
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
        </div>
    );
}