import React, {useState, useEffect} from "react";
import {QueryClientProvider, QueryClient} from 'react-query'
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
import './styles/App.css'

const queryClient = new QueryClient()


function App() {

//user authentication state
const [isAutheticated, setIsAuthenticated] = useState(false)
const [isAdminAunthenticated, setIsAdminAuthenticated] = useState(false)
const [isAdminOpen, setIsAdminOpen] = useState(false)

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
const localServer = 'http://localhost:3000'

//check if there is an authorization on token on the local storage

const isVerified= async()=>{
try {

  const response= await fetch(`${remoteServer}/users/verified`,{
    method:'GET',
    headers:{token:localStorage.token}
  })
  
  const verified=await response.json()
  console.log('this is verified',verified)
  if(verified.code === 200){
    verified.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }
console.log('is user authenticated: ',isAutheticated)


} catch (err) {
  console.log('this is the error',err)


}
}
useEffect(()=>{
  isVerified()
})

  return(
      
    <>
    
  <QueryClientProvider client={queryClient}>
  {
    !isAdminOpen ?
    ( 
      !isAutheticated ?
      <Router>
        <Routes>
          <Route path = "/" exact element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdminOpen={setIsAdminOpen}/>}/>
          <Route path = "/registeruser" exact element={<RegisterUser setIsAdminOpen={setIsAdminOpen}/>} />
        </Routes>
      </Router>
       :
       <Router>
         <Routes>
           <Route path="/" exact element={<Home setIsAuthenticated={setIsAuthenticated}/>}></Route>
           <Route path="/dashboard" exact element={<Dashboard setIsAuthenticated={setIsAuthenticated}/>}></Route> 
           <Route path="/uploadbackground" exact element= {<BackgroundCheck/>}></Route>
           <Route path="*" exact element={<NotFound/>}></Route>
         </Routes>   
       </Router>
    )
    :
    (
      !isAdminAunthenticated ?
     <Router>
       <Routes>
        <Route path="/" exact element={<LoginAdmin setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/admin/register" exact element={<RegistAdmin setIsAuthenticated={setIsAuthenticated}/>}></Route>
       </Routes>  
     </Router>   
      :
      <Router>
        <Routes>
         <Route path="/admin/panel" exact element={<AdminPanel setIsAuthenticated={setIsAuthenticated}/>}></Route>
       </Routes>
      </Router> 
    )
       
  }
      
</QueryClientProvider>

</>
  )
}

export default App;
