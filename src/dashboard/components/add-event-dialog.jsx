import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { DatePicker } from './day-picker';

export function AddEventDialog({ show, onClose, selectedDate, selectedEvent, setEvents }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(selectedDate);
    const [endDate, setEndDate] = useState(selectedDate);

    useEffect(() => {
        if (show) {
            if (selectedEvent) {
                setTitle(selectedEvent.title);
                setDescription(selectedEvent.description);
                setStartDate(new Date(selectedEvent.start));
                setEndDate(new Date(selectedEvent.end));
            } else {
                setTitle('');
                setDescription('');
                setStartDate(selectedDate);
                setEndDate(selectedDate);
            }
        }
    }, [show, selectedDate, selectedEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { title, description, start: startDate, end: endDate };
        console.log(eventData);

        if (selectedEvent) {
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event === selectedEvent ? eventData : event
                )
            );
        } else {
            setEvents(prevEvents => [...prevEvents, eventData]);
        }

        onClose();
    };

    const handleDelete = () => {
        setEvents(prevEvents => prevEvents.filter(event => event !== selectedEvent));
        onClose();
    };

    if (!show) return null;

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                    <DialogDescription>
                        {selectedEvent ? 'Edit the event details.' : 'Add a new event for the selected date.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4">
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event Title"
                        className="border p-2 mb-4 w-full"
                    />
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Event Description"
                            className="border p-2 mb-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Start Date</label>
                        <DatePicker date={startDate} setDate={setStartDate} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">End Date</label>
                        <DatePicker date={endDate} setDate={setEndDate} />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        {selectedEvent && (
                            <button type="button" onClick={handleDelete} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        )}
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{selectedEvent ? 'Save' : 'Add Event'}</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}