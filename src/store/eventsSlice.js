import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchEventsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess(state, action) {
            state.events = action.payload;
            state.loading = false;
        },
        fetchEventsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        bookTicket(state, action) {
            const eventId = action.payload;
            const event = state.events.find(event => event.id === eventId);
            if (event && event.availableSeats > 0) {
                event.availableSeats -= 1; // Reduce available seats by 1
            }
        },
    },
});

export const { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure, bookTicket } = eventsSlice.actions;

export default eventsSlice.reducer;