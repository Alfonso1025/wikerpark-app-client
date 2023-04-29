import React, {useState, useEffect} from 'react'
import AllSits from './AllSits'
import UserSits from './UserSits'
import SitForm from './SitForm'

import '../styles/BabySittingPost.css'

const BabySitPost = (props)=>{

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
//recibe props
const name = props.name
const point = props.point
//local state

return (
    <div className='wrapper-sit-post'>

       
        <UserSits poin={point}/>
        <AllSits name={name}/>
        <SitForm/>


    </div>
)
}

export default BabySitPost