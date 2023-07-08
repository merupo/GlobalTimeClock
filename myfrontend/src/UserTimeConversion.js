import React, { useState } from "react";

const UserTimeConversion = () => {
  const [indiaTime, setIndiaTime] = useState("");
  const [hongKongTime, setHongKongTime] = useState("");
  const [usaTime, setUsaTime] = useState("");
  const [customTime, setCustomTime] = useState("");

  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  const handleCustomTimeSubmit = (event) => {
    event.preventDefault();

    const customIndiaTime = convertCustomTimeToUTC(customTime, "Asia/Kolkata");
    const customHongKongTime = convertTimeToTimeZone(
      customIndiaTime,
      "Asia/Hong_Kong"
    );
    const customUsaTime = convertTimeToTimeZone(
      customIndiaTime,
      "America/New_York"
    );

    setIndiaTime(formatTime(customIndiaTime));
    setHongKongTime(formatTime(customHongKongTime));
    setUsaTime(formatTime(customUsaTime));
  };

  const convertCustomTimeToUTC = (timeString, timeZone) => {
    const [time, ampm] = timeString.split(" ");
    const [hours, minutes, seconds] = time.split(":").map(Number);

    let adjustedHours = hours;
    if (hours === 12) {
      adjustedHours = ampm === "AM" ? 0 : 12;
    } else {
      adjustedHours = ampm === "AM" ? hours : hours + 12;
    }

    const now = new Date();
    const customTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      adjustedHours,
      minutes,
      seconds
    );

    const customTimeUTC = new Date(
      customTime.toLocaleString("en-US", { timeZone: timeZone })
    );

    return customTimeUTC;
  };

  const convertTimeToTimeZone = (time, timeZone) => {
    return new Date(time.toLocaleString("en-US", { timeZone: timeZone }));
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = padZero(hours % 12 || 12);
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Hong Kong Time</h2>
          <p>{hongKongTime}</p>
        </div>
        <div>
          <h2>India Time</h2>
          <form onSubmit={handleCustomTimeSubmit}>
            <input
              type="text"
              value={customTime}
              onChange={handleCustomTimeChange}
              placeholder="Enter Indian time (HH:mm:ss AM/PM)"
            />
            <button type="submit">Submit</button>
          </form>
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

export default UserTimeConversion;