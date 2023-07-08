import React from 'react';
import img from './img.png';
import CurrentTime from './CurrentTime';
import UserTimeConversion from './UserTimeConversion';
import TimeZoneConverter from './TimeZoneConverter';

const Main = () => {
  return (
    <div className='main'>
    <img src={img} alt=" " />
    <div className="content">
      <CurrentTime />
      <UserTimeConversion />
      <TimeZoneConverter />
    </div>
    </div>
  )
}

export default Main;