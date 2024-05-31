import React from 'react';
import moment from 'moment';


function Time() {
  const tomorrow = moment().add(1, 'day').format("Do MMMM,YYYY");
  const time = moment().subtract(1, 'hour').format("HH:mm:ss");
  return (
    <div className="time">
      <p>Tomorrow's date is { tomorrow }</p>
      <p>This was the time: { time }, an hour ago</p>
    </div>
  )
}
export default Time