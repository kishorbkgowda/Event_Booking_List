import React from 'react';

const Pagination = ({ totalEvents, eventsPerPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
        <>
        <div className='w-full bg-[#7935DD] flex gap-3 justify-center items-center p-2'>
          {pageNumbers.map(number => (
            <li key={number} className="flex justify-center items-center">
              <button 
                onClick={() => paginate(number)} 
                className="bg-white text-center rounded-md flex justify-center items-center px-4 py-2"
              >
                {number}
              </button>
            </li>
          ))}
        </div>
      </>
      
  );
};

export default Pagination;