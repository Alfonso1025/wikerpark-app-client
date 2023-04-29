import React, {useState} from 'react'
import Navbar from '../utilities/Navbar'
import '../styles/LoginAdmin.css'

const LoginAdmin= (props)=>{
// recibe props
const setIsAuthenticated = props.setIsAuthenticated

//store user input info into state variables
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const submitLoginForm = async(e)=>{
e.preventDefault()
const body = {email, password}
try {
  const response = await  fetch('http://localhost:3003/admin/loginAdmin',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(body)
  })
  const loggedAdmin = await response.json()
  console.log(loggedAdmin)
  localStorage.setItem('token', loggedAdmin.data)
  setIsAuthenticated(true)

  
} 
catch (error) {
    console.log(error)
}
}



    return (

        <>
            <Navbar></Navbar>
            <div className='login-admin-wrapper'>
                <h1 className='login-admin-header'>Login administrator </h1>
                
                
                <form className="form-login-admin" onSubmit={submitLoginForm}>
                    <input type="email"
                        placeholder="email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        className="input-login-admin"/>
      
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        className="input-login-admin"/>

                    <button className="button-login-admin">Sign in</button>
                </form> 
                
            </div>
            
        
        </>
            
    )
}
export default LoginAdmin