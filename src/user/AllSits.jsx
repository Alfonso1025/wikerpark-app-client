import React, {useState, useEffect} from 'react'
import moment from 'moment'
import '../styles/BabySittingPost.css'

const AllSits = (props)=>{

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
const localServer = process.env.REACT_APP_LOCAL_SERVER
//recibe props
const name = props.name



//manage state for all siting posts
const [sits, setSits] = useState([])
console.log(sits)
//manage state for asyncronus requests status
const [allSitsStatus, setAllSitsStatus] = useState('')

const [errorMessage, setErrorMessage] = useState('An error ocurred')





//function definitions


const getAllSits = async ()=>{
    setAllSitsStatus('LOADING')
    console.log('getting all sits')
    try {
        const response = await fetch(`${remoteServer}/sittingpost`,{
            method : 'GET',
        })
        const parseResponse = await response.json()
        console.log(parseResponse)
        if(parseResponse.code !== 200){
            setAllSitsStatus('ERROR')
            setErrorMessage(parseResponse.message)
            return
        }
        //succesful request but there are no sits yet
        else if(parseResponse.code ===200 && parseResponse.message === 'no_sits_found'){
            setAllSitsStatus('SUCCESS')
        }
        else if(parseResponse.code ===200 && parseResponse.message === 'sits_found'){
            setAllSitsStatus('SUCCESS')
            setSits(parseResponse.data)
        }
        
    } catch (error) {
        setAllSitsStatus('ERROR')
        if(error instanceof Error){
            setErrorMessage(error.message)
        }
    }
    
    
    
}



const acceptSit = async (sitId)=>{

  const body = {name}
  const response = await fetch(`${remoteServer}/sittingpost/insertcandidate/${sitId}`,{

     method: 'PUT',
     headers:{'content-type':'application/json',token:localStorage.token },
     body:JSON.stringify(body)
     
 }) 
 
}





useEffect(()=>{
    getAllSits()
},[])


if(allSitsStatus === 'LOADING') return <h1>...LOADING</h1>
if(allSitsStatus === 'ERROR') return <h1>{errorMessage}</h1>


return (
   
        <section className='all-sits'>

        {sits.map( sit => { 

            
            if(sit.candidate !== null) { 

               if(sit.candidate.length > 0){
                return (

                <div className='all-sits-item'>
                    <div className='all-sits-date'>
                        <h1>{moment(sit.date).format('DD')}</h1>
                        <h3>{moment(sit.date).format('MMMM')}</h3>
                    </div>
    
                    <div className='all-sits-body'>
    
                    <h3 className='all-sits-username'> {sit.user[0].userName}</h3>
                    
                    <p>You will take care of:</p>
                    {sit.user[0].kids.map( kid => (
                        <div>
                            
                            <p> {kid.name} who is {kid.age} months old</p>  
                            
    
                        </div>
                        
                    )
    
                        )}
                    
                    <p>{sit.user[0].address}.</p>
                    <p> {sit.startTime}:00. to {sit.endTime}:00.</p>
                    <h5 className='all-sits-description'>{sit.description}.</h5>
                     
    
                    </div>
                    <div className='all-sits-button'>
    
                       <p  className='all-sits-points'> You earn {sit.points} points</p>
    
                 { sit.carriedBy === null ?
                        sit.candidate.map( cand =>(
                           
                               <p >{cand.candidateName} is offering to take the sit</p>
                           
                        ))
    
                        :
                        <h3>This sit was taken by {sit.carriedBy.carriedByName}</h3>
                    }
    
                    
                   {
                       sit.carriedBy === null &&
                       <button onClick={()=> acceptSit(sit._id)}>Take sit</button>
                   } 
    
                 </div>
    
                </div>
                    
                   )
                   
               }
              
        



            }
           
           else if(sit.candidate === null || sit.candidate.length < 1){
            return (
                <div className='all-sits-item'>
                <div className='all-sits-date'>
                    <h1>{moment(sit.date).format('DD')}</h1>
                    <h3>{moment(sit.date).format('MMMM')}</h3>
                </div>

                <div className='all-sits-body'>

                <h3 className='all-sits-username'> {sit.user[0].userName}</h3>
                
                <p>You will take care of:</p>
                {sit.user[0].kids.map( kid => (
                    <div>
                        
                        <p> {kid.name} who is {kid.age} months old</p>  
                        

                    </div>
                    
                )

                    )}
                
                <p>{sit.user[0].address}.</p>
                <p> {sit.startTime}:00. to {sit.endTime}:00.</p>
                <h5 className='all-sits-description'>{sit.description}.</h5>
                 

            </div>
             <div className='all-sits-button'>

             <p  className='all-sits-points'> You earn {sit.points} points</p>

                
               {
                   sit.carriedBy === null &&
                   <button onClick={()=> acceptSit(sit._id)}>Take sit</button>
               } 

             </div>

                </div>
               )
           }
            
     }
            
        )}

    
        </section>  

       
      
            
      
      
        


 
)
}

export default AllSits