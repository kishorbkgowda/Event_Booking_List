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

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getbacktologin = ()=>
    {
      dispatch(logout());
       navigate('/');
    }
     
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
 
  
  // Debugging: Log filtered events
  console.log("Filtered Events:", filteredEvents);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Debugging: Log current events
  console.log("Current Events:", currentEvents);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col items-center gap-2 justify-between">
      <div className="flex gap-[2rem] p-2 border border-sky-600 rounded-sm w-full bg-[#7935DD] justify-center">
        <h2 className="flex justify-center  bg-white items-center pr-2 pl-2 rounded-md font-semibold text-lg">
          Event List
        </h2>
        <select
          className="rounded-lg pl-2 pr-2 font-medium text-[1rem]"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="All">All Categories</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Technology">Technology</option>
        </select>

        <input
          className="pl-4 rounded-xl border border-sky-600 font-medium text-[1rem]"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={getbacktologin} className="bg-red-600  text-white rounded-xl p-2 font-bold">LOGOUT</button>
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
    </div>
  );
};

export default EventList;