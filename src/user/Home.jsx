import Navbar from "../utilities/Navbar"
import Header from "../utilities/Header"
import img1 from '../media/homeImage1.jpg'
import img2 from '../media/homeImage2.jpg'
import img3 from '../media/homeImage3.jpg'
import '../styles/Home.css'
import Footer from "../utilities/Footer"
function Home(props){
   //recibe props
   const setIsAuthenticated = props.setIsAuthenticated
   const text1 = `Reignite the spark in your date nights, effortlessly! Enjoy quality time with your partner, without breaking the bank on babysitters. 
     `

    const text2 = `Earn points while babysitting for others, and exchange them for your 
    own carefree date 
    nights. Get ready to sparkle in love again!`

    const text3 = `Enjoy our secure community with monthly meet-ups, building unforgettable 
    connections. All members undergo background checks for your peace of mind.`
    return(
        <>
       
        <div className="home-main-container">
        <Navbar></Navbar>
        <Header></Header>
        <div className="home-content-wrapper">
            <div className="home-text">
                <p>{text1}</p>
            </div>
            <div className="home-image">
                <img src={img1} alt=""  className="img"/>
            </div> 
        </div>
         
        <div className="cards-wrapper">
           {/*  <div className="card">
                <h1>1</h1>
                <h2>Pass a background Check</h2>
            </div>
            <div className="card">
                <h1>2</h1>
                <h2>Attend the monthly meeting</h2>
            </div>
            <div className="card">
                <h1>3</h1>
                <h2>Take sits and start earning points</h2>
            </div>
            <div className="card">
                <h1>4</h1>
                <h2>Request a sit and go on a date!</h2>
            </div>
             */}
        </div>
        
        <div className="home-content-wrapper">
        
            <div className="home-image">
                <img src={img2} alt=""  className="img"/>
            </div>
            <div className="home-text">
                <p>{text2}</p>
            </div> 
        </div>
        <div className="home-content-wrapper">
            <div className="home-text">
                <p>{text3}</p>
            </div>
            <div className="home-image">
                <img src={img3} alt=""  className="img"/>
            </div> 
           
        </div> 
        <Footer/> 
    </div>
    </>
   
    )

}

export default Home