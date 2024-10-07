import Calendar from "react-calendar";
import { useState } from "react";

export const CalendarComponent = ({ selectedTeam, onDateSelect }) => {
  // Extract available dates and ensure they are in 'YYYY-MM-DD' format
  const availableDates = Array.isArray(selectedTeam?.availableDates) ? selectedTeam.availableDates : [];

  console.log("Selected Team calendar:", availableDates); // For debugging

  // Helper function to format date in 'YYYY-MM-DD' using local time
  const formatDateToLocal = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to check if a date is available
  const isDateAvailable = (date) => {
    const formattedDate = formatDateToLocal(date);
    // console.log("Formatted Date (Local):", formattedDate);
    
    return availableDates.includes(formattedDate);
  };

  // Function to adjust the date to remove any time zone shift
  const adjustToLocalDate = (date) => {
    // Create a new date object to remove the time zone offset
    const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return adjustedDate;
  };

  // Handle date selection
  const handleDateChange = (date) => {
    const adjustedDate = adjustToLocalDate(date); // Ensure date is treated as local date
    console.log("Selected Date (Adjusted):", adjustedDate);

    if (isDateAvailable(adjustedDate)) {
      if (onDateSelect) {
        onDateSelect(adjustedDate); // Call onDateSelect only if it's defined
      } else {
        console.error("onDateSelect function is not passed!");
      }
    } else {
      console.log("Selected date is not available.");
    }
  };

  return (
    <div>
      <Calendar
        tileClassName={({ date }) => (isDateAvailable(date) ? "available-date" : null)}
        onClickDay={handleDateChange} // Call the handler on day click
      />
      <style jsx>{`
        .available-date {
          background-color: #00B98E;
          color: white;
        }
      `}</style>
    </div>
  );
};
