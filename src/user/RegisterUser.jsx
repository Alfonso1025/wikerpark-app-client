import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import logo from '../media/WikerParkLogo.png'





const RegisterUser = (props) => {

const navigate = useNavigate();
const remoteServer = process.env.REACT_APP_REMOTE_SERVER

//recibe props

const setIsAdminOpen = props.setIsAdminOpen

//local state
const [userName, setUserName]=useState('')
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const [errorMessage, setErrorMessage] = useState('missing credentials')
const [isSignUpFailed, setIsSignUpFailed] = useState(false)
const [isSignUpSuccessful, setIsSignUpSuccesfull] = useState(false)
//function definitions
const validateInputs = (userName, email, password)  => {
       
    if(userName == '' || email == '' || password == ''){
        setErrorMessage('missing a required field')
        return false
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setErrorMessage('invalid input format')
        return false
    }
    if(password.length > 10){
        setErrorMessage('password cant be longer than 10 characters')
        return false
    }
    return true
}

const submitUserToServer = async (e) => {
e.preventDefault()
try {
    if(!validateInputs(userName, email, password)) {
        //show the error message for 2 seconds, then come back to display sign up form
           console.log('aha')
          setIsSignUpFailed(true)
           setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
           return
           
    }
    const body= {userName,email,password}
    const user = await fetch(`${remoteServer}/users/register`,{
           method:'POST',
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(body)
    })
    
    const newUser= await user.json()
    console.log(newUser)
    if(newUser.code !== 200){
        if(newUser.code === 400){
            if(newUser.message === 'missing_credentials')setErrorMessage('email and password are required fields')
            else if(newUser.message === 'invalid_email') setErrorMessage('invalid_email_format')
        }
        else if(newUser.code === 409){
            if(newUser.message === 'existing_user') setErrorMessage('already have an account. Log in')
        
        }
        setUserName('')
        setEmail('')
        setPassword('')
        setIsSignUpFailed(true)
        setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
        
        return 
    }
    setIsSignUpSuccesfull(true)
    setTimeout(()=>{navigate('login')}, 3000)
    
}
 catch (error) {
    if(error instanceof Error){
        console.log('this is the error',error)
        
     }
}   
 
}


const goToLogin = ()=>{
    navigate('/login');
}
const goToAdmin =()=>{
    navigate('/adminlogin')
}

    return (

        <> 
       
       <div className='login-wrapper'>
           <img className='logo' src={logo} alt="logo" />
           <form className='form-login' onSubmit={submitUserToServer}>
            <input type="text"
                placeholder="name"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                className= 'input-signin'
             />
            <input type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className= 'input-signin'
             />
              <input type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className= 'input-signin'
             />
             <input type="submit" value="sign up" className='button-signin'/>
           </form>
           {isSignUpFailed && 
             <div><p>{errorMessage}</p></div>
           }
           {
            isSignUpSuccessful &&
            <div><p>Your account was created!</p></div>
           }
           <div className='goTo-container'>
                <div className='goTo-item'> 
                    <p className='goTo-p'> Already have an account?</p>
                    <button className='goTo-button'onClick={goToLogin}>Sign up</button>
                </div>
                <div className='goTo-item'>
                    <p className='goTo-p'>Or    login as administrator</p>
                    <button className='goTo-button'onClick={goToAdmin}>Admin Panel</button>
                </div>
                
            </div>
       </div>
      </>
    )
}

export default RegisterUser