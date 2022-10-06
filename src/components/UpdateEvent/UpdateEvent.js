import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import 'bootstrap'
import './UpdateEvent.css'

const UpdateEvent = ({eventToUpdate,updateEvent,removePopup}) => {
    const formik = useFormik({
        initialValues : {
            eventName : eventToUpdate.eventName,
            location : eventToUpdate.location,
            startDate : eventToUpdate.startDate,
            endDate : eventToUpdate.endDate,
            banner : eventToUpdate.banner
        },
        onSubmit : values => {
            axios.put(`https://event-list-naveen.herokuapp.com/CreateEvent/${eventToUpdate._id}`,{
                eventName : values.eventName,
                location : values.location,
                startDate : values.startDate,
                endDate : values.endDate,
                banner : values.banner
            }).then(res=>{
               updateEvent(res.data)
               removePopup()
            }).catch(err=>console.log(err))
        }
    })
    console.log(formik.values.eventName)
  return (
    <div className='Popup'>
      <div className='Popup-Inner'>
      <form onSubmit={formik.handleSubmit} className='Event-form'>
            <h2>Event Details Update</h2>
            <div className='form-group'>
            <label>Event Name</label>
            <input type={'text'} placeholder='Event Name...' name='eventName' onChange={formik.handleChange} value={formik.values.eventName} autoComplete='off'/>
            </div >
            <div className='form-group'>
            <label>Location</label>
            <textarea cols={40} rows={3} placeholder='Location...' name='location' onChange={formik.handleChange} value={formik.values.location} autoComplete='off'></textarea>    
            </div >
            <div className='form-group'>
            <label>Start Date</label>
            <input type={'Date'} onChange={formik.handleChange} name='startDate' value={formik.values.startDate}/>
            </div>
            <div className='form-group'>
            <label>End Date</label>
            <input type={'Date'} onChange={formik.handleChange} name='endDate' value={formik.values.endDate}/>
            </div>
            <div className='form-group'>
            <label>Banner</label>
            <input type={'file'} onChange={(e)=>{
                const file = URL.createObjectURL(e.currentTarget.files[0])
                formik.setFieldValue('banner',file)
            }} name='banner'/>
            </div >
            <div>
            <input type={'submit'} value='Update Event'/>
            </div>      
      </form>


        </div>
     
      </div>

    
  )
}

export default UpdateEvent
