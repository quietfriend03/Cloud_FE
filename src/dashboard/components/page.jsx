import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ProfileBar } from './profile-bar';
import { AddEventDialog } from './add-event-dialog';

const localizer = momentLocalizer(moment);

export const Page = () => {
    const [events, setEvents] = useState([
        { title: "Sample Event 1", start: new Date(), end: new Date() },
        { title: "Sample Event 2", start: new Date(new Date().setDate(new Date().getDate() - 1)), end: new Date(new Date().setDate(new Date().getDate() - 1)) },
        { title: "Sample Event 3", start: new Date(new Date().setDate(new Date().getDate() + 1)), end: new Date(new Date().setDate(new Date().getDate() + 1)) },
        { title: "Sample Event 4", start: new Date(new Date().setDate(new Date().getDate() - 2)), end: new Date(new Date().setDate(new Date().getDate() - 2)) },
        { title: "Sample Event 5", start: new Date(new Date().setDate(new Date().getDate() + 2)), end: new Date(new Date().setDate(new Date().getDate() + 2)) },
    ]);

    const [showDialog, setShowDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setSelectedDate(null);
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
            <div style={{ height: '100vh', width: '300px'}}>
                <ProfileBar events={events} />
            </div>
            <div style={{ flex: 1 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
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
                setEvents={setEvents}
            />
        </div>
    );
};