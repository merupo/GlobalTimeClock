import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [indiaTime, setIndiaTime] = useState('');
  const [hongKongTime, setHongKongTime] = useState('');
  const [usaTime, setUsaTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const indiaOffset = 5.5 * 60 * 60 * 1000; // India time zone offset in milliseconds
      const hongKongOffset = 8 * 60 * 60 * 1000; // Hong Kong time zone offset in milliseconds
      const usaOffset = -4 * 60 * 60 * 1000; // USA (Eastern Time) time zone offset in milliseconds

      const india = new Date(now.getTime() + indiaOffset);
      const hongKong = new Date(now.getTime() + hongKongOffset);
      const usa = new Date(now.getTime() + usaOffset);

      setIndiaTime(formatTime(india));
      setHongKongTime(formatTime(hongKong));
      setUsaTime(formatTime(usa));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
  };

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Hong Kong Time</h2>
          <p>{hongKongTime}</p>
        </div>
        <div>
          <h2>India Time</h2>
          <p>{indiaTime}</p>
        </div>
        <div>
          <h2>USA Time</h2>
          <p>{usaTime}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentTime;