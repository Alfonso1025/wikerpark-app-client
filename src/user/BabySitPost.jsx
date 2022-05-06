import React, {useState, useEffect} from 'react'
import '../styles/BabySittingPost.css'

const BabySitPost = (props)=>{

//recibe props
const name = props.name
const point = props.point

//manage state for input form
const [qtyKids, setQtyKids] = useState('')
const [date, setDate] = useState('')
const [startTime, setStartTime] = useState('')
const [endTime, setEndTime] = useState('')
const [description, setDescription] = useState('')

//manage state for all siting posts
const [sits, setSits] = useState([])
console.log(sits)

//manage state for siting posts made by current user
const [sitsUser, setSitsUser] = useState([])




const currentDate = new Date()


//function definitions
const sendFormToServer = async (e)=>{
e.preventDefault()
try {
    const body = {qtyKids, date, startTime, endTime, description}
    const sendSitPostToServer = await fetch('http://localhost:3003/sittingpost',{
      
       method: 'POST',
       headers: {'content-type':'application/json', token:localStorage.token},
       body: JSON.stringify(body)

   }) 
   console.log(sendSitPostToServer)
}
 catch (error) {
    console.log(error)
}
}

const getAllSits = async ()=>{
    const response = await fetch('http://localhost:3003/sittingpost',{
        method : 'GET',
    })
    const parseResponse = await response.json()
    setSits(parseResponse)
    
    
}

const getUserSits = async ()=>{

    const response = await fetch('http://localhost:3003/sittingpost/sitsbyid',{
        method : 'GET',
        headers:{token:localStorage.token}

    })
    const sits = await response.json()
    setSitsUser(sits)

    console.log('sits by id',sits)
}

const acceptSit = async (sitId)=>{

  const body = {name}
  const response = await fetch(`http://localhost:3003/sittingpost/insertcandidate/${sitId}`,{

     method: 'PUT',
     headers:{'content-type':'application/json',token:localStorage.token },
     body:JSON.stringify(body)
     
 }) 
 
}

const assignSit = async (sitId, candidateId, candidateName)=>{
    try {
        
        const body = {candidateId, candidateName}
        const response = await fetch(`http://localhost:3003/sittingpost/updatecarriedby/${sitId}`,{

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

    const response = await fetch('http://localhost:3003/sittingpost/completedsit', {

    method : 'PUT',
    headers : {'content-type': 'application/json', token : localStorage.token},
    body : JSON.stringify(body)
    
})
const parseResponse = await response.json()
console.log(parseResponse)

}

useEffect(()=>{
    getAllSits()
},[])

 useEffect(()=>{
    getUserSits()
},[]) 

if(!sits.data || sits === []) return 'LOADING ...'

return (
    <div className='wrapper-sit-post'>

        <section className='form-sit-post'>
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
                <label> What is the start time?</label>cd
                <input type="number"
                placeholder="Type a digit from 00 to 23"
                value={startTime}
                onChange={(e)=>setStartTime(e.target.value)}
                />
                <label> At what time are will you be back home?</label>
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

        <div className='sits'>

        <section className='individual-sits'>
            {
                sitsUser.map( sit =>(
                    <>
                   
                    <h3>Date: {  sit.date
                    
                    }</h3>
                    <h3>Status: { sit.completed === false  ? 

                          <p>Active</p> : 
                          <p>Completed</p> 
                          
                          } </h3>

                    <h4>Description {sit.description}</h4>
                    
                    {   sit.carrriedBy === null  ?

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

                        :
                        <h3>This sit  was taken by {sit.carriedBy.carriedByName}</h3>

                    }

                    {new Date(sit.date)  < currentDate &&
                         <>
                        <h5>Please go ahead and mark this sit as completed so {sit.carriedBy.carriedByName} can get the points </h5>
                        <button 
                        onClick={()=>markSitCompleted(sit._id, sit.carriedBy.carriedById, sit.points) }>
                            Completed
                         </button>
                        </>
                      }
                    </>
                    
                ))
            }
            
            
        </section>

        <section className='all-sits'>

        {sits.data.map(sit => { 

            if(sit.candidate.length !== 0 || sit.candidate !== [] ) { 

               return (
                <div className='all-sits-item'>
                <h3>Posted by: {sit.user[0].userName}</h3>
                <h3>You will take care of:</h3> 

                {sit.user[0].kids.map( kid => (
                    <div>
                        
                        <h4>{kid.name}</h4>
                        <h4>who is {kid.age} months old</h4>

                    </div>
                    
                )

                    )}
                <h3>The date for the sit is: {sit.date}</h3>
                <h3>Address: {sit.user[0].address}</h3>
                <h3>The sit starts at: {sit.startTime}</h3>
                <h3>{sit.user[0].userName} will be back home at {sit.endTime}</h3>
                <h5>{sit.description}</h5>
                <h3> you earn: {sit.points} points</h3>

                { sit.carriedBy === null ?
                    sit.candidate.map( cand =>(
                       <div>
                           <h3>{cand.candidateName} is offering to take the sit</h3>
                       </div> 
                    ))

                    :
                    <h3>This sit was taken by {sit.carriedBy.carriedByName}</h3>
                }
                
               {
                   sit.carriedBy === null &&
                   <button onClick={()=> acceptSit(sit._id)}>Take sit</button>
               }
                

            </div>
               )
               
            }
           
           else if(sit.candidate.length ===0 || sit.candidate === []){
            return (
                <div className='all-sits-item'>
                <h3>Posted by: {sit.user[0].userName}</h3>
                <h3>You will take care of:</h3> 

                {sit.user[0].kids.map( kid => (
                    <div>
                        
                        <h4>{kid.name}</h4>
                        <h4>who is {kid.age} months old</h4>

                    </div>
                    
                )

                    )}
                <h3>The date for the sit is: {sit.date}</h3>
                <h3>Address: {sit.user[0].address}</h3>
                <h3>The sit starts at: {sit.startTime}</h3>
                <h3>{sit.user[0].userName} will be back home at {sit.endTime}</h3>
                <h5>{sit.description}</h5>
                <h3> you earn: {sit.points} points</h3>

                  
                <button onClick={()=>acceptSit()}>Take sit</button>

            </div>
               )
           }
            
     }
            
        )}

    
        </section>  

            
        </div>
      
   

 </div>
)
}

export default BabySitPost