import React, { useState } from 'react';

const TimeZoneConverter = () => {
  const [timezone, setTimezone] = useState('');
  const [convertedTimes, setConvertedTimes] = useState({});

  const handleConvert = () => {
    // Call the backend API to convert the timezone
    fetch('/api/convert_timezone/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timezone }),
    })
      .then((response) => response.json())
      .then((data) => setConvertedTimes(data));
  };

  return (
    <div>
    <div style={{ display: "flex", justifyContent:'center'}}>
    <center>
      <h1>Timezone Converter</h1>
      <input
        type="text"
        placeholder="Enter timezone (e.g., Asia/Tokyo)"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>
      <div>
        <p>Hong Kong Time: {convertedTimes.hongkong}</p>
        <p>India Time: {convertedTimes.india}</p>
        <p>USA Time: {convertedTimes.usa}</p>
      </div>
    </center>
    </div>
    </div>
  );
};

export default TimeZoneConverter;
