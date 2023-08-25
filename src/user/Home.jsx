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
        
        <div className="Rules-wrapper">

            <h1>Rules</h1>
            <h2> Becoming a member</h2>
            <p>You must be a Wiker Park neighbor</p>
            <p>Sign up for an account</p>
            <p>Submit a criminal background check</p>
            <p>Fill up the questionary</p>
            <p>Attend an onboarding meeting</p>

            <h2>How it works</h2>
            <p>Once you are a member, start taking sits posted on the app to earn points</p>
            <p>When you have enough points, post a sit</p>
            <p>Repeat</p>

        </div>
        <div className="home-content-wrapper">
            <div className="home-text">
                <p>{text1}</p>
            </div>
            <div className="home-image">
                <img src={img1} alt=""  className="img"/>
            </div> 
        </div>
         
        <div className="cards-wrapper">
           
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