import React, {useState} from 'react'

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

        <div>
            <h1>Login administrator </h1>

            <form className="form-signin" onSubmit={submitLoginForm}>
                <input type="email"
                  placeholder="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  className="input-signin"/>
                  
                <input 
                type="password" 
                 placeholder="password"
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                 className="input-signin"/>
                <button className="button-signin">Sign in</button>
            </form> 
        
        </div>
            
    )
}
export default LoginAdmin