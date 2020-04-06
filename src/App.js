import React, { useState, useEffect, useRef } from 'react';
import './App.css';

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

function App() {
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Right now, it's {date.toLocaleString()}
        </p>
        <p>
          {date.getTime()}
        </p>
      </header>
    </div>
  );
}

export default App;
