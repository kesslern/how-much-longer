import React, { useState } from 'react';
import TrumpCountdown from './TrumpCountdown';
import YearCountdown from './YearCountdown';
import './App.css';

function App() {
  const [tab, setTab] = useState(0);

  return <div className="app">
    <div className="buttons">
      <button className={tab === 0 ? "selected" : ""} onClick={() => setTab(0)}>The End of Trump's Presidency</button>
      <button className={tab === 1 ? "selected" : ""} onClick={() => setTab(1)}>The End of 2020</button>
    </div>
    <div className="content">
      {tab === 0 && <TrumpCountdown />}
      {tab === 1 && <YearCountdown />}
    </div>
  </div>;
}

export default App;
