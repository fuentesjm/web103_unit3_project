import React from 'react'
import '../css/Event.css'

// Convert a 24-hour "HH:MM" string into 12-hour format with AM/PM.
const formatTime = (time) => {
    if (!time) return ''

    const [hourStr, minute] = time.split(':')
    let hour = parseInt(hourStr, 10)
    const period = hour >= 12 ? 'PM' : 'AM'

    hour = hour % 12
    if (hour === 0) hour = 12

    return `${hour}:${minute} ${period}`
}

const Event = (props) => {

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {props.date} <br /> {formatTime(props.time)}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
