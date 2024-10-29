import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        events: eventsReducer,
        auth: authReducer,
    },
});

export default store;