import React from 'react'

export const FormatTime = (props) => {
    const dateObj = new Date(props.timeStamp);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours() % 12 || 12;
    const minute = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = dateObj.getHours() < 12 ? 'AM' : 'PM';
    const formattedTimeStamp = `${day} ${month} ${year}, ${hour}:${minute} ${ampm}`;
  
    return <p>{formattedTimeStamp}</p>;
}
