import React, {useState} from 'react'
const RegisterUser= (props)=>{

//recibe props
const setIsAuthenticated = props.setIsAuthenticated

//store user info inputs in state variables
const [userName, setUserName]=useState('')
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')

// send user info to server
const submitUserToServer = async (e) => {
e.preventDefault()
try {
    const body= {userName,email,password}
    const user = await fetch('http://localhost:3003/users/register',{
           method:'POST',
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(body)
    })
    const newUser= await user.json()
    localStorage.setItem("token", newUser.data)
    setIsAuthenticated(true)
    
}
 catch (error) {
    console.log(error)
}
}




    return (
       <div>
           <form onSubmit={submitUserToServer}>
            <input type="text"
                placeholder="name"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
             />
            <input type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
             />
              <input type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
             />
             <input type="submit" value="sign up"/>
            </form>
       </div>

    )
}
export default RegisterUser