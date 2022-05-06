import React, {useEffect, useState} from 'react'
import BackgroundCheck from './BackgroundCheck'
import ProfileForm from './ProfileForm'
import BabySitPost from './BabySitPost'



const Dashboard= (props)=>{

//recibe props
const setIsAuthenticated = props.setIsAuthenticated
//store user info from server into state variables
const [name, setName] = useState('')
const [id, setId]= useState('')
const [point, setPoint] = useState('')

  async  function getUser(){
        try {
           const response = await fetch('http://localhost:3003/dashboard/getuser',{
               method:'GET',
               headers:{token:localStorage.token}
           }) 
           
           const user = await response.json()
           setName(user.data.userName)
           setId(user.data._id)
           setPoint(user.data.point)
           console.log(user)
        } 
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    })


    return (
        <div>
           Hello {name}

           {/* <BackgroundCheck id={id}/>
           <ProfileForm/> */}
           <BabySitPost name = {name} point = {point} />
           
           <button 
            onClick={(e)=>{
                e.preventDefault()
                localStorage.removeItem("token")
                setIsAuthenticated(false)
              } }
             className="button-logout"
             >logout
            </button>
        </div>
    )
}
export default Dashboard