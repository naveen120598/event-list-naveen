import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddEvent from './components/AddEvent/AddEvent'
import EventList from './components/EventList/EventList'
import UpdateEvent from './components/UpdateEvent/UpdateEvent'

const App = () => {
  const [eventList,setEventList] = useState([])
  const [eventToUpdate,setEventToUpdate] = useState({})
  const [showPopup,setShowPopup] = useState(false)

  useEffect(()=>{
    axios.get(`https://event-list-naveen.herokuapp.com/CreateEvent`).then(res=>{
      setEventList(res.data)
    }).catch(err=>console.log(err))
  },[])

  const addEvent = (newEvent) =>{
      setEventList([...eventList,newEvent])
  }

  const updateEvent = (UpEvent) =>{
    const newList = [...eventList]
    newList.forEach((event)=>{
      if(event._id === UpEvent._id){
        event.eventName = UpEvent.eventName
        event.location = UpEvent.location
        event.startDate = UpEvent.startDate
        event.endDate = UpEvent.endDate
        event.buffer = UpEvent.buffer
      }
    })
    setEventList(newList)
  }

const removeEvent = (remEvent) =>{
  const newList = eventList.filter(event=> !(event._id===remEvent._id))
  setEventList(newList)
}
  return (
    <div>
      <AddEvent addEvent={addEvent}/>
      <EventList eventList={eventList} removeEvent={removeEvent} setEventToUpdate={setEventToUpdate}  showPopup={()=>setShowPopup(!showPopup)}/>
      {showPopup && <UpdateEvent eventToUpdate={eventToUpdate} updateEvent={updateEvent} removePopup={()=>setShowPopup(!showPopup)}/>}
    </div>
  )
}

export default App
