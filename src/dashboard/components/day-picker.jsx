import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import * as React from 'react';

export const DatePicker = ({ date, setDate }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start border border-auth_form_border border-gray-400 text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Date of birth</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};