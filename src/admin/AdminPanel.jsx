
import React, {useEffect, useState} from 'react'
import ViewBackground from './ViewBackground'
import Navbar from '../utilities/Navbar'
import '../styles/AdminPanel.css'


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
//manage state to show adminPanel or bacground image
const [showBackImage, setShowBackImage] = useState(false)




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
        console.log('this is the response ',response)
        const parseResponse = await response.json()
       
        console.log('this is the parseResponse', parseResponse)
        setImage(parseResponse)
        setShowBackImage(true)
    } 
    catch (error) {
        console.log('this is the error',error)
    }
}



if(users.length === 0) return 'LOADING'

if(!showBackImage) {

    return (
        <>

        <Navbar></Navbar>
        <div className='admin-panel-wrapper'>
           <div className='admin-panel-header'>
              Hello bla bla bal {name}
              This is admin panel
           </div>
          
        <div className='admin-panel-body'>

           <section className='users-table'>
           <table >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>email</th>
                            <th>User Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    {users.map(user=>{
              return  <tr>
                        
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user._id}</td>
                        {user.isCleared === true ? <td>Active</td> : <td>Pending</td>}

                        
                    </tr>
                    
                    
                    })}
                        
                    </tbody>
  
            </table>
       
           </section>
           <section className='search-background'>
               <div className='search-header'>
               <h3>Find  backdround-check by user Id</h3>
               
               </div>
              
               <form className='search-background-form'  onSubmit={getBackgroundFile}> 
                   
                   <input type="text"
                        placeholder='User Id'
                        value={id} 
                        onChange={ e => setId(e.target.value) }/>
                   
                <button>Find</button>
               </form>
             
           </section>

        </div> 
           
        </div>
        </>
    )

}

else if(showBackImage){
    return(
        <div>
            
            <ViewBackground image={image}/> 
        </div>
        
    )
    
}

    
}
export default AdminPanel