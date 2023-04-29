import Navbar from "../utilities/Navbar"
function Home(props){
   //recibe props
   const setIsAuthenticated = props.setIsAuthenticated
    return(
        <div>
          
        <Navbar></Navbar>

        <h1>This is home</h1>

<button 
            onClick={(e)=>{
                e.preventDefault()
                localStorage.removeItem("token")
                setIsAuthenticated(false)
              } }
             className="button-logout"
             >logout
            </button>
        </div>
    )
}

export default Home