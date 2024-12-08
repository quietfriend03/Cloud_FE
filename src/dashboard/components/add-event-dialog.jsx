import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { DatePicker } from './day-picker';

export function AddEventDialog({ show, onClose, selectedDate, setEvents }) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(selectedDate);
    const [endDate, setEndDate] = useState(selectedDate);

    const handleAddEvent = () => {
        setEvents(prevEvents => [
            ...prevEvents,
            { title, start: startDate, end: endDate }
        ]);
        onClose();
    };

    if (!show) return null;

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                        Add a new event for the selected date.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event Title"
                        className="border p-2 mb-4 w-full"
                    />
                    <div className="mb-4">
                        <label className="block mb-2">Start Date</label>
                        <DatePicker date={startDate} setDate={setStartDate} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">End Date</label>
                        <DatePicker date={endDate} setDate={setEndDate} />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button onClick={handleAddEvent} className="px-4 py-2 bg-blue-500 text-white rounded">Add Event</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}