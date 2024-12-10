import React, { useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ProfileBar } from './profile-bar';
import { AddEventDialog } from './add-event-dialog';
import { EventSheet } from './event-sheet';

const localizer = momentLocalizer(moment);

export const Page = () => {
    const [events, setEvents] = useState([
        { title: "Sample Event 1", start: new Date(), end: new Date(), description: "Description for Sample Event 1" },
        { title: "Sample Event 2", start: new Date(new Date().setDate(new Date().getDate() - 1)), end: new Date(new Date().setDate(new Date().getDate() - 1)), description: "Description for Sample Event 2" },
        { title: "Sample Event 3", start: new Date(new Date().setDate(new Date().getDate() + 1)), end: new Date(new Date().setDate(new Date().getDate() + 1)), description: "Description for Sample Event 3" },
        { title: "Sample Event 4", start: new Date(new Date().setDate(new Date().getDate() - 2)), end: new Date(new Date().setDate(new Date().getDate() - 2)), description: "Description for Sample Event 4" },
        { title: "Sample Event 5", start: new Date(new Date().setDate(new Date().getDate() + 2)), end: new Date(new Date().setDate(new Date().getDate() + 2)), description: "Description for Sample Event 5" },
    ]);

    const [showDialog, setShowDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const calendarRef = useRef(null);

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
            <div style={{ height: '100vh', width: '300px'}}>
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
            />
        </div>
    );
};