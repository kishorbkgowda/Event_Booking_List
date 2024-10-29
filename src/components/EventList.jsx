import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
} from "../store/eventsSlice";
import EventDetail from "./EventDetail";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getbacktologin = () => {
    dispatch(logout());
    toast("Successfully Logged out");
    setTimeout(() => {
      navigate('/');
    }, 3000); 
  };

 

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(fetchEventsStart());
      try {
        const response = await fetch("/events.json");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        dispatch(fetchEventsSuccess(data));
      } catch (err) {
        dispatch(fetchEventsFailure(err.message));
      }
    };

    fetchEvents();
  }, [dispatch]);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen w-full overflow-scroll md:overflow-hidden flex flex-col items-center gap-2 justify-between">
      <div className="flex flex-col gap-[2rem] p-2 border border-sky-600 rounded-sm w-full bg-[#7935DD] justify-center">
        <div>
          <h2 className="flex justify-center text-[2rem] p-2 bg-white items-center rounded-md font-semibold text-lg">
            Event List
          </h2>
        </div>
        <div className="flex justify-around md:justify-between items-center p-1">
          <select
            className="rounded-lg p-2 font-medium text-[1rem]"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All Categories</option>
            <option value="Concert">Concert</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
          </select>

          <input
            className="rounded-lg p-2 text-sm md:font-medium text-[1rem]"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button 
            onClick={getbacktologin} 
            className="rounded-lg pl-5 pr-5 pt-2 pb-2 text-[1rem] bg-red-600 text-white font-bold transition-transform duration-300 hover:scale-[1.1] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-10 p-2 justify-center">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <EventDetail key={event.id} event={event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>

      <Pagination
        totalEvents={filteredEvents.length}
        eventsPerPage={eventsPerPage}
        paginate={paginate}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default EventList;
