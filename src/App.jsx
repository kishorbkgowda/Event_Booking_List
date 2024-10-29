import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import Login from './components/Login';
import store from './store/store';
import { AuthProvider } from './contexts/AuthContext';


const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/events" element={<EventList />} />
        </Routes>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
