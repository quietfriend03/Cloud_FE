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
import { createEvent, editEvent, deleteEvent } from '../utils/service';

export function AddEventDialog({ show, onClose, selectedDate, selectedEvent, setEvents, loadEvents }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(selectedDate || new Date());
    const [endDate, setEndDate] = useState(selectedDate || new Date());

    useEffect(() => {
        if (show) {
            if (selectedEvent) {
                setName(selectedEvent.title || selectedEvent.name || '');
                setDescription(selectedEvent.description || '');
                setStartDate(new Date(selectedEvent.start));
                setEndDate(new Date(selectedEvent.end));
            } else {
                setName('');
                setDescription('');
                setStartDate(selectedDate || new Date());
                setEndDate(selectedDate || new Date());
            }
        }
    }, [show, selectedDate, selectedEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            name: name,
            description,
            startDate,
            endDate,
            sub: localStorage.getItem('aws_sub'),
        };

        try {
            if (selectedEvent) {
                await editEvent({ ...eventData, id: selectedEvent.id });
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === selectedEvent.id ? 
                        { ...eventData, id: selectedEvent.id, start: startDate, end: endDate, title: name } : 
                        event
                    )
                );
            } else {
                await createEvent(eventData);
                await loadEvents(); // Refetch all events after creating a new event
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }

        onClose();
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(selectedEvent.id);
            setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
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
                <form onSubmit={handleSubmit} className="">
                    <label className="block mb-2">Event's name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Event Name"
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