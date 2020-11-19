import React, { useState, useEffect, useRef } from 'react';

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

function TrumpCountdown() {
  const [date, setDate] = useState(new Date());
  const end = new Date("1/20/2021");

  useInterval(() => {
    setDate(new Date());
  }, 1000)


  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 0 && year === 2021 && day === 20) {
    return <div className="content">It's fuckin' over today!</div>
  }

  var delta = Math.abs(end - date) / 1000;
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  var seconds = delta % 60;

  return (
    <div className="content">
      {days} days, {hours} hours, {Math.round(seconds, 2)} seconds until the day Trump leaves office.
    </div>
  );
}

export default TrumpCountdown;
