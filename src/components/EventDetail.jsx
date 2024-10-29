import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { bookTicket } from '../store/eventsSlice';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const EventDetail = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from context

  const handleBooking = () => {
    if (!user) {
      alert('Please log in to book tickets.'); // Alert if not logged in
      navigate("/");
      return; // Prevent booking if not logged in
    }

    if (event.availableSeats > 0) {
      dispatch(bookTicket(event.id)); // Dispatch action to reduce seats
      alert('Ticket booked!');
    } else {
      alert('This event is fully booked.');
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <div className="relative overflow-hidden">
        <a href="#" className=''>
          <img
            className="w-full h-auto max-w-[21rem] overflow-hidden"
            src={event.category === "Music" ? "https://tse3.mm.bing.net/th?id=OIP.7FECyYvFZmvxqp4tJ5EriQHaEK&pid=Api&P=0&h=180" : event.category === "Art" ? "https://static.vecteezy.com/system/resources/previews/000/446/375/large_2x/vector-font-design-with-word-art.jpg" : event.category === "Technology" ? "https://cdn.vectorstock.com/i/1000v/32/74/technology-abstract-neon-font-and-alphabet-techno-vector-25883274.jpg" : null }
            alt="Sunset in the mountains"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
        <a href="#!">
          <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            {event.category}
          </div>
        </a>
      </div>
      <div className="px-6 py-4 mb-auto">
        <a
          href="#"
          className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
        >
          {event.title}
        </a>
        <p className="text-gray-500 text-sm">{event.description}</p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <svg
            height="13px"
            width="13px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: 'new 0 0 512 512' }}
            xmlSpace="preserve"
            aria-hidden="true"
          >
            <g>
              <g>
                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
              </g>
            </g>
          </svg>
          <span className="ml-1"> Date: {event.date}</span>
        </span>

        <div className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-col">
          <span>Available Seats: {event.availableSeats}</span>
          <span>Price: ${event.price}</span>
        </div>
      </div>
      <button
        onClick={handleBooking}
        className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500 mx-6 my-4"
      >
        Book Ticket
      </button>
    </div>
  );
};

export default EventDetail;
