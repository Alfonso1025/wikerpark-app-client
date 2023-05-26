import React, {useState} from 'react'
const RegistAdmin= (props)=>{
const remoteServer = process.env.REACT_APP_REMOTE_SERVER
//recibe props
const setIsAuthenticated = props.setIsAuthenticated

//store user info inputs in state variables
const [adminName, setAdminName]=useState('')
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')

// send user info to server
const submitAdminToServer = async (e) => {

e.preventDefault()
try {
    const body= {adminName,email,password}
    const user = await fetch(`${remoteServer}/admin/registerAdmin`,{
           method:'POST',
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(body)
    })
    const newAdmin= await user.json()
    localStorage.setItem("token", newAdmin.data)
    setIsAuthenticated(true)
    
}
 catch (error) {
    console.log(error)
}
}




    return (
       <div>
           <h1>Register Administrator</h1>

           <form onSubmit={submitAdminToServer}>
            <input type="text"
                placeholder="name"
                value={adminName}
                onChange={(e)=>setAdminName(e.target.value)}
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
export default RegistAdmin