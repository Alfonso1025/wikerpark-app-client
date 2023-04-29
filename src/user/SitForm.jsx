import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const SitForm = (props)=>{

const navigate = useNavigate();
const remoteServer = process.env.REACT_APP_REMOTE_SERVER


//manage state for input form
const [qtyKids, setQtyKids] = useState('')
const [date, setDate] = useState('')
const [startTime, setStartTime] = useState('')
const [endTime, setEndTime] = useState('')
const [description, setDescription] = useState('')
const [isError, setIsError] = useState('')
const [errorMessage, setErrorMessage] = useState('')
//function definitions
const sendFormToServer = async (e)=>{
e.preventDefault()
try {
    if(qtyKids ==='' || date==='' || startTime === '' || endTime === '' || description === ''){
        setErrorMessage('missing a field.')
        setIsError(true)
        setTimeout(()=>{setIsError(false)}, 2000)
        return
    }
    if(isNaN(qtyKids)){
        setErrorMessage('The amount of kids must be a digit')
        setIsError(true)
        setTimeout(()=>{setIsError(false)}, 2000)
        return
    }
    if(isNaN(startTime)){
        setErrorMessage('The start time must be a digit')
        setIsError(true)
        setTimeout(()=>{setIsError(false)}, 2000)
        return
    }
    if(isNaN(endTime)){
        setErrorMessage('The ending time must be a digit')
        setIsError(true)
        setTimeout(()=>{setIsError(false)}, 2000)
        return
    }
    const body = {qtyKids, date, startTime, endTime, description}
    const sendSitPostToServer = await fetch(`${remoteServer}/sittingpost`,{
      
       method: 'POST',
       headers: {'content-type':'application/json', token:localStorage.token},
       body: JSON.stringify(body)

   }) 
   const response = await sendSitPostToServer.json()
   if(response.code !== 200){
    setErrorMessage(response.message)
    setIsError(true)
    setTimeout(()=>{setIsError(false)}, 2000)
    return
   }
   if(response.code === 200){
     console.log('success')
     navigate('/')
   }
  
}
 catch (error) {
    console.log(error)
}
}

return (
  
        <section className='sit-post-form'>

                <div className='sit-post-form-header'>
                    <h3>Request a baby sitter</h3>
                    <div><span></span></div>
                </div>
            <form >

                <label> How many kids</label>
                <input type="number"
                placeholder="Type a digit"
                value={qtyKids}
                onChange={(e)=>setQtyKids(e.target.value)}
                />
                <label> What is the date?</label>
                <input type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                />
                <label> What is the start time?</label>
                <input type="number"
                placeholder="Type a digit from 00 to 23"
                value={startTime}
                onChange={(e)=>setStartTime(e.target.value)}
                />
                <label> What is the end time?</label>
                <input type="number"
                placeholder="Type a digit from 00 to 23"
                value={endTime}
                onChange={(e)=>setEndTime(e.target.value)}
                />
                <label>Comments</label>
                 <textarea 
                 name = "" 
                value = {description} 
                 onChange = {(e) => setDescription(e.target.value)} 
                ></textarea>

                <button onClick={sendFormToServer}>Send</button>
            </form>
         </section>


)
}

export default SitForm