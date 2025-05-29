import React, { useState } from 'react';
import './Calender.css';

const Calendar = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [date, setDate] = useState(new Date());

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrev = () => {
    setDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNext = () => {
    setDate(new Date(currentYear, currentMonth + 1));
  };

  const generateCalendarDays = () => {
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    const today = new Date();
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const todayDate = today.getDate();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<span key={`empty-${i}`} className="empty"></span>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const isToday = isCurrentMonth && i === todayDate;
      days.push(
        <span key={i} className={isToday ? 'current-day' : ''}>{i}</span>
      );
    }

    return days;
  };

  return (
    <div className="calender">
      <div className="navigate-date">
        <h2 className="month">{months[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={handlePrev}></i>
          <i className="bx bx-chevron-right" onClick={handleNext}></i>
        </div>
      </div>
      <div className="weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <span key={idx}>{day}</span>
        ))}
      </div>
      <div className="days">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;


