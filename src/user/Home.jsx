function Home(props){
   //recibe props
   const setIsAuthenticated = props.setIsAuthenticated
    return(
        <div>This is home

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