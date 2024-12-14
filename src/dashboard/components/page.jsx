import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ProfileBar } from './profile-bar';
import { AddEventDialog } from './add-event-dialog';
import { EventSheet } from './event-sheet';
import { fetchEvents, createEvent, editEvent, deleteEvent } from '../utils/service';

const localizer = momentLocalizer(moment);

export const Page = () => {
    const [events, setEvents] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const calendarRef = useRef(null);

    const loadEvents = async () => {
        try {
            const sub = localStorage.getItem('aws_sub'); // Replace with dynamic user sub if needed
            const fetchedEvents = await fetchEvents(sub);
            if (Array.isArray(fetchedEvents)) {
                const mappedEvents = fetchedEvents.map(event => ({
                    title: event.name,
                    start: new Date(event.startDate),
                    end: new Date(event.endDate),
                    description: event.description,
                    id: event.id,
                }));
                setEvents(mappedEvents);
            } else {
                console.error('Fetched events are not an array:', fetchedEvents);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setSelectedEvent(null);
        setShowDialog(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setSelectedDate(new Date(event.start));
        setShowDialog(true);
        if (calendarRef.current) {
            calendarRef.current.scrollToTime(new Date(event.start));
            calendarRef.current.props.onNavigate('DATE', new Date(event.start));
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
            <div style={{ height: '100vh', width: '250px'}}>
                <ProfileBar events={events} />
                <EventSheet events={events} onEventClick={handleEventClick} />
            </div>
            <div style={{ flex: 1 }}>
                <Calendar
                    ref={calendarRef}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    style={{ height: "100%", width: "100%", display: "flex", justifyItems: "center", margin: "auto", padding: "10px" }}
                    dayPropGetter={() => ({
                        className: 'hover:bg-blue-100 cursor-pointer',
                    })}
                />
            </div>
            <AddEventDialog
                show={showDialog}
                onClose={handleCloseDialog}
                selectedDate={selectedDate}
                selectedEvent={selectedEvent}
                setEvents={setEvents}
                loadEvents={loadEvents} // Pass loadEvents to refetch events
            />
        </div>
    );
};