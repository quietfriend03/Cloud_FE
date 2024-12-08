import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function EventSheet({ events }) {
  const currentDate = new Date();

  const lateEvents = events.filter(event => new Date(event.start) < currentDate);
  const upcomingEvents = events.filter(event => new Date(event.start) >= currentDate);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>All Events</SheetTitle>
          <SheetDescription>
            Here you can view and manage all events
          </SheetDescription>
        </SheetHeader>
        <div>
          <h2 className="font-bold text-lg">Late Events</h2>
          {lateEvents.length > 0 ? (
            lateEvents.map((event, index) => (
              <div key={index} className="mb-2">
                <p>{event.title}</p>
                <p>{new Date(event.start).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No late events</p>
          )}
        </div>
        <div>
          <h2 className="font-bold text-lg">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={index} className="mb-2">
                <p>{event.title}</p>
                <p>{new Date(event.start).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}