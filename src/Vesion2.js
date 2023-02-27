import React, { useState, useEffect } from 'react';
import './App.css';

function Vesion2() {
  const [time, setTime] = useState(0);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    let timerId;
    if (counting && time > 0) {
      timerId = setTimeout(() => {
        setTime(time - 10);
      }, 10);
    } else if (counting && time === 0) {
      setCounting(false);
    }
    return () => clearTimeout(timerId);
  }, [counting, time]);

  const handleTimeChange = (event) => {
    setTime(parseInt(event.target.value) * 1000);
  };

  const handleStart = () => {
    setCounting(true);
  };

  const handlePause = () => {
    setCounting(false);
  };

  const handleReset = () => {
    setCounting(false);
    setTime(0);
  };

  const getTimerColor = () => {
    if (time <= 5000) {
      return '#e74c3c'; // red
    } else if (time <= 10000) {
      return '#f1c40f'; // yellow
    } else {
      return '#2ecc71'; // green
    }
  };

  const getTimerProgress = () => {
    return (time / (parseInt(document.getElementById('time-input').value) * 1000)) * 100;
  };

  return (
    <div className="countdown-container">
      <div className="input-container">
        <input type="number" id="time-input" onChange={handleTimeChange} placeholder="Enter time in seconds" />
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="countdown-timer" style={{ backgroundColor: getTimerColor() }}>
        <div className="countdown-liquid" style={{ transform: `translateY(${100 - getTimerProgress()}%)` }}></div>
        <div className="countdown-time">{(time / 1000).toFixed(1)}</div>
      </div>
    </div>
  );
}

export default Vesion2;
