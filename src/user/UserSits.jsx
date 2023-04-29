import React, {useState, useEffect} from 'react'
import moment from 'moment'
import openIcon from '../media/open3.png'
import closeIcon from '../media/close1.png'

import '../styles/BabySittingPost.css'

const UserSits = (props)=>{

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
//recibe props

const point = props.point

//local state
const [sitsUser, setSitsUser] = useState([])
const [userSitsStatus, setUserSitsStatus] = useState('')
const [errorMessage, setErrorMessage] = useState('An error ocurred')
const [openUserSits, setOpenUserSits] = useState(false)
const currentDate = new Date()


//function definitions


const getUserSits = async ()=>{
    try {
        const response = await fetch(`${remoteServer}/sittingpost/sitsbyid`,{
            method : 'GET',
            headers:{token:localStorage.token}
    
        })
        const userSits = await response.json()
        if(userSits.code !== 200){
            setUserSitsStatus('ERROR')
            setErrorMessage(userSits.message)
            console.log(userSits.message)
            return
        }
        if(userSits.code === 200 && userSits.message === 'no_sits_found'){
            setUserSitsStatus('SUCCESS')
    
        }
        else if(userSits.code === 200 && userSits.message === 'user_sits_found'){
            setUserSitsStatus('SUCCESS')
            setSitsUser(userSits.data)
            console.log('sits by id',userSits)
        }
    } catch (error) {
       console.log(error)
       setUserSitsStatus('ERROR')
       if(error instanceof Error){
         setErrorMessage(error.message)
       }
    }

    
    
    
}



const assignSit = async (sitId, candidateId, candidateName)=>{
    try {
        
        const body = {candidateId, candidateName}
        const response = await fetch(`${remoteServer}/sittingpost/updatecarriedby/${sitId}`,{

            method : 'PUT',
            headers : {'content-type': 'application/json'},
            body : JSON.stringify(body)

        }) 
        const parseResponse = await response.json()
        console.log(parseResponse)
        
    } 
    catch (error) {
        console.log(error)
    }
}

const markSitCompleted = async (sitId ,  carriedById, sitPoints)=> {
    
    const body = {sitId,  carriedById, sitPoints, point}

    const response = await fetch(`${remoteServer}/sittingpost/completedsit`, {

    method : 'PUT',
    headers : {'content-type': 'application/json', token : localStorage.token},
    body : JSON.stringify(body)
    
})
const parseResponse = await response.json()
if(parseResponse.message === 'success') {
    window.location.reload()
}



console.log(parseResponse)

}


 useEffect(()=>{
    getUserSits()
},[]) 




return (
<>
  {!openUserSits &&
   
    
    <div className='open-user-sits'>
        
        <img src={openIcon} className="open-icon"alt="open"  onClick={()=>setOpenUserSits(true)} />
        <h5 className='open-text'>My requests</h5>
    </div>
   
  }
  {
    openUserSits && 
    <section className='individual-sits'>

    <div className='individual-sits-header'>

        <h1>Manage requests</h1>
        <img src={closeIcon} alt=""  className='close-icon' onClick={()=>setOpenUserSits(false)}/>
    </div>
    {
        sitsUser.length === 0 &&
        <div className='no-sits-toShow'>
            <h1>You have no requests.</h1>
         </div>
    }
    {
        sitsUser.map( sit =>(
    <div className='individual-sits-item'>
   
    <h6>Date: {  moment(sit.date).format('DD MMMM YYYY')}</h6>
    
    <h6>Status: { sit.completed === false  ? "Active" : "Completed" } </h6>

    <h6>Description: {sit.description}</h6>
    
     {   sit.carrriedBy === null  &&
         <>
         {sit.candidate !== null &&
            sit.candidate.map( cand =>(
            
                <>
                 <h3>{cand.candidateName} is offering to take the sit</h3>
                {
                    
                    <button onClick={()=> assignSit(sit._id, cand.candidateId, cand.candidateName )}>
                        Assign
                    </button>
                }
                
                </> 
            )) 
        }
         </>
    } 
    { sit.carriedBy !== null &&
        <h3>This sit  was taken by {sit.carriedBy.carriedByName}</h3>

    } 

     {new Date(sit.date)  < currentDate  && sit.completed === false && sit.carriedBy !=null &&
         <>
        <h5>Please go ahead and mark this sit as completed so {sit.carriedBy.carriedByName} can get the points </h5>
        <button 
        onClick={()=>markSitCompleted(sit._id, sit.carriedBy.carriedById, sit.points) }>
            Completed
         </button>
        </>
      } 
    
     { new Date(sit.date) < currentDate && sit.completed === true && sit.carriedBy !=null &&

        <> 
        <h1>This sit was completed and it is unactive</h1>
        </>    

    } 

    </div>
    
))
}


    </section>
  }
   

 </>
        

 
)
}

export default UserSits