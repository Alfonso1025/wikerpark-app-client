
import React, {useEffect, useState} from 'react'


const AdminPanel= ()=>{

//store admin info from server into state variables
const [name, setName] = useState('')
//store user objects in a state array
const [users, setUsers] = useState([])
//store id from user in state variable
const [id, setId] = useState('')
//store image in state variable
const[image, setImage] = useState('')
console.log('this is the image',image)

// find admin that is logged in
  async  function getAdmin(){
        try {
           const response = await fetch('http://localhost:3003/adminPanel',{
               method:'GET',
               headers:{token:localStorage.token}
           }) 
           const admin = await response.json()
           setName(admin.data.adminName)
           console.log(admin)
        } 
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAdmin()
    },[])

    //get all users.
    const getAllUsers = async ()=>{
        try {
            const response = await fetch('http://localhost:3003/adminPanel/getUsers',{
               method:'GET',
               
            })
            const users = await response.json()
            setUsers(users)
            console.log(users)
        } 
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])

//download background file from s3
const getBackgroundFile = async (e) => {

    try {
        e.preventDefault()
        const response = await fetch(`http://localhost:3003/adminPanel/getbackgroundcheck/${id}`)
       console.log('this is the response', response)
        setImage(response)
    } 
    catch (error) {
        console.log(error)
    }
}
    return (
        <div>
           Hello bla bla bal {name}
           This is admin panel
           <div>
           {users.map(user=>{
              return <ul>
                     <li>{user._id}</li>
                     <li>{user.userName}</li>
                     <li>{user.email}</li>
                     </ul>
           })}
           </div>
           <div>
               <h1>View backdround check</h1>
               <h3>In order to find the background file youa want, please enter the user id in the text box</h3>
               <form onSubmit={getBackgroundFile}> 
                   <label>Fin a background file</label>
                   <input type="text"
                   value={id} 
                   onChange={ e => setId(e.target.value) }/>
                <button>Find</button>
               </form>
               <img src= {`adminPanel/getbackgroundcheck/${image}`} alt=''/>
           </div>
        </div>
    )
}
export default AdminPanel