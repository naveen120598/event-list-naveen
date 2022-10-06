import axios from 'axios'
import React, { useState } from 'react' 
import {Buffer} from 'buffer'
import 'bootstrap'

const EventList = ({eventList,removeEvent,setEventToUpdate,showPopup}) => {
    const [banner,setBanner] = useState({})
    const eventlist1 = eventList.map((event,index)=>{
        const removeEvent1 = (id) =>{
            axios.delete(`https://event-list-naveen.herokuapp.com/CreateEvent/${id}`)
            .then(res=>{removeEvent(res.data)})
            .catch(err=>console.log(err))
        }
        console.log(event.banner)
        return (
            <tr key={index}>
                    <td>{event.eventName}</td>
                    <td>{event.location}</td>
                    <td>{event.startDate}</td>
                    <td>{event.endDate}</td>     
                    <td><img src={''} alt='banner_image' /></td>
                <td>
                    <button onClick={()=>{ 
                        setEventToUpdate(event)
                        showPopup()
                    }}>Edit</button>
                </td>
                <td>
                    <button onClick={()=>{
                        removeEvent1(event._id)
                    }}>Delete</button>
                </td>
            </tr>
            
        )
    })
  return (
    <div>
         <table className='table table-hover table-striped '>
            <thead>
                <tr>
                <th>Event Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>end Date</th>
                <th>Banner</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>              
            </thead>
            <tbody>
            {eventlist1}
            </tbody>
        </table>
    </div>
  )
}

export default EventList
