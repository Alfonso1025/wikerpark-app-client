import React, {useState, useEffect} from "react";

import Login from "./user/Login"
import RegisterUser from "./user/RegisterUser"
import Dashboard from "./user//Dashboard"
import Home from "./user/Home";
import NotFound from "./NotFound";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BackgroundCheck from "./user/BackgroundCheck";
import RegistAdmin from "./admin/RegistAdmin";
import LoginAdmin from "./admin/LoginAdmin";
import AdminPanel from "./admin/AdminPanel";



function App() {

//user authentication state
const [isAutheticated, setIsAuthenticated] = useState(false)


//check if there is an authorization on token on the local storage

const isVerified= async()=>{
try {
  const response= await fetch('http://localhost:3003/users/verified',{
    method:'GET',
    headers:{token:localStorage.token}
  })
  //the response is a boolean
  //if there was a token sent to the authorization middleware
  //the server return true otherwise returns false
  const verified=await response.json()
  console.log('this is verified',verified)
  verified===true ? setIsAuthenticated(true) : setIsAuthenticated(false)

} catch (err) {
  console.log(err)
}
}
useEffect(()=>{
  isVerified()
})

  return(
      
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/login" exact element={
        <>
        {!isAutheticated ? 
          
          <Login setIsAuthenticated={setIsAuthenticated}/>
        
        : <Dashboard setIsAuthenticated={setIsAuthenticated}/> }
        </>

        } >

        </Route>

        <Route path="/registeruser" exact element={
          <>
          {!isAutheticated ?

          <RegisterUser setIsAuthenticated={setIsAuthenticated}/>
          :
          <Login setIsAuthenticated={setIsAuthenticated}/>

          }
          </>
        }>

        </Route>
        <Route path="/dashboard" exact element={
         <>
         {isAutheticated ?

          <Dashboard setIsAuthenticated={setIsAuthenticated}/>
          :
          <Login setIsAuthenticated={setIsAuthenticated}/>

         }
         </>

        }>

        </Route>
        



        <Route path="/admin/login" exact element={
        <>
        {!isAutheticated ? 
          
          <LoginAdmin setIsAuthenticated={setIsAuthenticated}/>
        
        : <AdminPanel setIsAuthenticated={setIsAuthenticated}/> }
        </>

        } >

        </Route>

        <Route path="/admin/register" exact element={
          <>
          {!isAutheticated ?

          <RegistAdmin setIsAuthenticated={setIsAuthenticated}/>
          :
          <LoginAdmin setIsAuthenticated={setIsAuthenticated}/>

          }
          </>
        }>

        </Route>
        <Route path="/admin/panel" exact element={
         <>
         {isAutheticated ?

          <AdminPanel setIsAuthenticated={setIsAuthenticated}/>
          :
          <LoginAdmin setIsAuthenticated={setIsAuthenticated}/>

         }
         </>

        }>

        </Route>



        <Route path="*" exact element={<NotFound/>}></Route>
        
        <Route path="/uploadbackground" exact element= {<BackgroundCheck/>}></Route>
      </Routes>
    </Router> 
    </>
  )
}

export default App;
