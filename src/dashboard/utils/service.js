import { axiosGet, axiosPost, axiosPut, axiosDelete } from "@/config/axios";

// Fetch events for a specific user
export const fetchEvents = async (sub) => {
    const endpoint = `event/${sub}`;
    const response = await axiosGet(endpoint);
    return response;
};

// Create a new event
export const createEvent = async (eventData) => {
    const endpoint = 'event/create';
    const response = await axiosPost(endpoint, eventData);
    return response;
};

// Edit an existing event
export const editEvent = async (eventData) => {
    const endpoint = 'event/edit';
    return await axiosPut(endpoint, eventData);
};

// Delete an event
export const deleteEvent = async (id) => {
    const endpoint = `event/delete/${id}`;
    return await axiosDelete(endpoint);
};