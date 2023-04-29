import React from 'react'
import checkMark from '../media/checkMark4.png'
import '../styles/Dashboard.css'

function CheckMark (props){
//recieve props
const notification = props.notification
return(

    <div className='checkMark-wrapper'>
        <h3 className='checkMark-h1'>Your {notification} has been received!</h3>
        <img className='checkMark-image' src={checkMark} alt="check mark" />
    </div>
)
}
export default CheckMark