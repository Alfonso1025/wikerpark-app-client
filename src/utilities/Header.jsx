import React,{useState} from 'react'
import '../styles/Header.css'
import Logo from '../media/WikerParkLogo.png'

const Header =(props)=>{



    return(
        <div className='header-wrapper'>
            <img src={Logo} alt="Wiker-Park logo" className='header-logo'/>
        </div>
    )
}
export default Header