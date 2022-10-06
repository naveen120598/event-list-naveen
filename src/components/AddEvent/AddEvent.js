import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import 'bootstrap'
import './AddEvent.css'


const AddEvent = ({addEvent}) => {
    const formik = useFormik({
        initialValues : {
            eventName : '',
            location : '',
            startDate : '',
            endDate : '',
            banner : null
        },
        onSubmit : values => {
            axios.post(`https://event-list-naveen.herokuapp.com/CreateEvent`,{
                eventName : values.eventName,
                location : values.location,
                startDate : values.startDate,
                endDate : values.endDate,
                banner : values.banner
            }).then(res=>{
                values.eventName = ''
                values.location = ''
                values.startDate = ''
                values.endDate = ''
                values.banner = null
                addEvent(res.data)
            }).catch(err=>console.log(err))
        }
    })
  return (
    <div className='main'>
        <div className='Event-form' >
            <h2>Event Details</h2>
        <form onSubmit={formik.handleSubmit} >
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
            <input type={'submit'} value='Create Event'/>
            </div>      
      </form>

        </div>    
    </div>
  )
}

export default AddEvent
