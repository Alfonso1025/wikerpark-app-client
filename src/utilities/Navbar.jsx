import { Link} from "react-router-dom"
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
const Navbar= (props)=>{
   const navigate = useNavigate()
    //recibe props
    const setIsAuthenticated = props.setIsAuthenticated

    return(

        <div className='navbar-wrapper'>

          <ul className='main-navbar'>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/home">Home</Link> 
          <li className="logout">
          <button 
                     onClick={(e)=>{
                    e.preventDefault()
                    navigate('/')
                    localStorage.removeItem("token")
                    setIsAuthenticated(false)
                  } }
                 className="button-logout"
                 >Logout

                </button>
          </li>

     
          </ul>
      
      </div> 
    
    )
}

export default Navbar