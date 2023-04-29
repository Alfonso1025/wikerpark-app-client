import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import BackgroundCheck from './BackgroundCheck'
import ProfileForm from './ProfileForm'
import BabySitPost from './BabySitPost'
import Navbar from '../utilities/Navbar'
import '../styles/Dashboard.css'
import CheckMark from './CheckMark.jsx'



const Dashboard= (props)=>{

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
//recibe props
const setIsAuthenticated = props.setIsAuthenticated
// local state


  async  function getUser(){
        try {
           const response = await fetch(`${remoteServer}/dashboard/getuser`,{
               method:'GET',
               headers:{token:localStorage.token}
           }) 
          
           const parseResponse = await response.json()
           console.log(parseResponse)
           return parseResponse
          
        } 
        catch (err) {
          console.log(err)
        }
    }

    const {data, isLoading, error} = useQuery('user', getUser)
    
  
if(isLoading) return <h1>LOADING ...</h1>
else if(error) return <h1>An error ocurred</h1>

   
 

return (
        <div className='dashboard-wrapper'>
           
           <Navbar setIsAuthenticated={setIsAuthenticated}></Navbar>

           { ! data.data.isCleared &&
                <>
                <div className='dashboard-header'>
                        <h3>Before getting started, submit your background check and fill out the form below</h3>
                </div>
                <div className='dashboard-content'>
                    {!data.data.isBackgroundUploaded ?  <BackgroundCheck id={data.data._id}/>:<CheckMark notification='background-check'/>}
                   
                    {!data.data.isFormUploaded ? <ProfileForm/> : <CheckMark notification='Form'/>} 
                    
                </div>
                

               </>

           }

           { data.data.isCleared && 
               <>
                <div className='dashboard-header'> 
                    <p className='dashboard-header-text'> {data.data.userName} {data.data.point} points earned</p>
                </div>
              
               <BabySitPost  name ={data.data.userName} point= {data.data.point} />
               
              
                </>
           }
               
           

            
        </div>
    )
}
export default Dashboard