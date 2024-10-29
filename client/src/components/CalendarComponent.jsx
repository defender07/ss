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
    return availableDates.includes(formattedDate);
  };

  // Function to check if a date is in the past
  const isDateExpired = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore the time portion
    return date < today; // Check if the date is before today
  };

  // Function to adjust the date to remove any time zone shift
  const adjustToLocalDate = (date) => {
    const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return adjustedDate;
  };

  // Handle date selection
  const handleDateChange = (date) => {
    const adjustedDate = adjustToLocalDate(date);
    console.log("Selected Date (Adjusted):", adjustedDate);

    if (isDateExpired(adjustedDate)) {
      alert("This date has expired.");
    } else if (isDateAvailable(adjustedDate)) {
      if (onDateSelect) {
        onDateSelect(adjustedDate);
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
        tileClassName={({ date }) => {
          if (isDateExpired(date)) {
            return "expired-date";
          }
          return isDateAvailable(date) ? "available-date" : null;
        }}
        onClickDay={handleDateChange}
      />
      <style jsx>{`
        .available-date {
          background-color: #00B98E;
          color: white;
        }
        .expired-date {
          background-color: #FF6666;
          color: white;
          pointer-events: none; /* Prevent clicking on expired dates */
        }
      `}</style>
    </div>
  );
};
