import React, {useState, useEffect} from "react";
import {QueryClientProvider, QueryClient} from 'react-query'
import Login from "./user/Login"
import RegisterUser from "./user/RegisterUser"
import Dashboard from "./user//Dashboard"
import Home from "./user/Home";
import NotFound from "./NotFound";
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet} from 'react-router-dom'
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

const ProtectedRoute = ({ isAuth, redirectPath}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

//check if there is an authorization on token on the local storage

const isVerified= async()=>{
try {
  console.log('this is the server: ',remoteServer)
  console.log(localStorage.token)
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
 
    
 <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="registeruser" element={<RegisterUser/>} />
        <Route element={<ProtectedRoute isAuth={isAutheticated} redirectPath={'/login'} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="backgroundcheck" element={<BackgroundCheck />} />
        </Route>
        <Route path="/admin/login"  element={<LoginAdmin setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/admin/register"  element={<RegistAdmin setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route element={<ProtectedRoute isAuth={isAdminAunthenticated} redirectPath={'/admin/login'} />}>
              <Route path="/admin/panel" exact element={<AdminPanel setIsAdminAuthenticated={setIsAdminAuthenticated}/>}></Route>
         </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Routes>
       
  
      
</QueryClientProvider> 

</>
  )
}

export default App;
