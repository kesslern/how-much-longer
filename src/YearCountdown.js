import React, { useState, useEffect, useRef } from 'react';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December", "January"
];

function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function YearCountdown() {
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000)

  const hoursInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() * 24;
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const now = date.getTime();
  const hoursCompleted = (now - monthStart) / 1000 / 60 / 60;
  const hoursLeft = hoursInMonth - hoursCompleted;
  const hoursPercent = hoursCompleted / hoursInMonth * 100;
  const daysIntoYear = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / 86400000);
  const daysLeft = daysInYear(date.getFullYear()) - daysIntoYear;
  const daysPercent = daysIntoYear / daysInYear(date.getFullYear()) * 100;

  return (
    <>
      <p>
        It's {monthNames[date.getMonth()]}. {hoursLeft.toFixed(2)} hours until {monthNames[nextMonth.getMonth()]}.
           <br />
        {hoursPercent.toFixed(2)}% through the month.
        </p>
      <p>
        {daysLeft} days left in {date.getFullYear()}.
          <br />
        {daysPercent.toFixed(2)}% through the year.
        </p>
    </>
  );
}

export default YearCountdown;
