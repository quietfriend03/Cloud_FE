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
        <Button variant="outline">All events</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>All Events</SheetTitle>
          <SheetDescription>
            Here you can view and manage all events
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 370px)' }}>
          <h2 className="font-bold text-lg mb-2">Late Events</h2>
          {lateEvents.length > 0 ? (
            lateEvents.map((event, index) => (
              <div key={index} className="mb-4 p-3 border rounded-lg shadow-sm flex justify-between items-center cursor-pointer">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-500">{new Date(event.start).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No late events</p>
          )}
        </div>
        <div className="mt-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <h2 className="font-bold text-lg mb-2">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={index} className="mb-4 p-3 border rounded-lg shadow-sm flex justify-between items-center cursor-pointer">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-500">{new Date(event.start).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
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