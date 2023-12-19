import React, { useState, useEffect } from 'react';

function StopwatchApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Секундомер</h1>
      <p>{formatTime(time)}</p>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Старт
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Стоп
        </button>
        <button onClick={handleReset}>
          Сброс
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          результаты
        </button>
      </div>
      <div>
        <h2>Последние результаты:</h2>
        {laps.length > 0 ? (
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{formatTime(lap)}</li>
            ))}
          </ul>
        ) : (
          <p>Нет записей</p>
        )}
      </div>
    </div>
  );
}

export default StopwatchApp;