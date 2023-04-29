import React, {useState} from 'react'

function ProfileForm (){

const remoteServer = process.env.REACT_APP_REMOTE_SERVER
//manage state for form inputs
const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [age, setAge] = useState('')
const [gender, setGender] = useState('')

//manage state to store every kid in a kids array
const [kidsArray, setKidsArray] = useState([])

let kid = {name, age, gender }
console.log(kidsArray)

//manage state to only show inputs related to child after "next child" button is clicked
const [showKidsInputs, setShowKidsInputs] = useState(false)

//manage state to show button sumbmit when user is done adding kids
const [showSubmitButton, setShowSubmitButton] = useState(false)
//manage state for the buttons styling. 
const [disabled, setDisable] = useState(true)

//function definitions

function validateSaveForm(){
    if(kid.age === '') return false
    
    if(kid.gender === '') return false

    if(kid.name === '') return false
    if(address ==='') return false
    setDisable(false)
    return true
}
function validateSubmittForm(){
   if(kidsArray.length < 1) return false
   if(address === '') return false
   return true
}
function saveForm(e){
    e.preventDefault()
    if(!validateSaveForm()) {
        console.log('one field is missing')
        return
    }
    console.log('okey with the form')
    const newKidsArray = [...kidsArray, kid]
    setKidsArray(newKidsArray)
    setShowKidsInputs(true)
    setName('')
    setAge('')
    setGender('')
    
}
function openSubmitButton(e){
    e.preventDefault()
    if(!validateSubmittForm()) return
    setShowSubmitButton(true)

}

async function submitForm(e){
    e.preventDefault()
    const body = {address, kidsArray}
    try {
       const response = await fetch(`${remoteServer}/dashboard/profileform`,{
           method:'POST',
           headers:{'content-type':'application/json', token:localStorage.token},
           body:JSON.stringify(body)
       })
       const formResponse = await response.json() 
       console.log(formResponse)
    } 
    catch (error) {
        console.log(error)
    }
}

return(
   
    <div className="profileform-wrapper">

        
        <div className='profileform-header'>
            <h2>Fill Up Form</h2>
            <div className='span-wrapper'> <span></span></div>
        </div>
        
        {
            !showKidsInputs && 
        <form className='profile-form'>

        <input type="text"
                placeholder="address in Chicago"
                value={address}
                onChange={(e)=>{
                    setAddress(e.target.value)
                    validateSaveForm()
                  }
                }
             />
        <input type="text"
                placeholder="child name"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                    validateSaveForm()
                   }
                }
             />
        <input type="text"
                placeholder="age in months"
                value={age}
                onChange={(e)=>{
                    setAge(e.target.value)
                    validateSaveForm()
                  }
                }
             />
             <input type="text"
                placeholder="gender"
                value={gender}
                onChange={(e)=>{
                    setGender(e.target.value)
                    validateSaveForm()
                 }
                }
             />
        
        
        
       { !showSubmitButton && 
       <div>
            <button onClick={saveForm}  className={!disabled? "profile-button": "button-disabled"}>Next child</button>
            <button onClick={openSubmitButton} className={!disabled ? "profile-button": "button-disabled"}>Done</button>
       </div>
       
       } 
        
        {showSubmitButton && <button onClick={submitForm} className="profile-button"> Send</button>}
        
        
        
        </form>
        }

        {
            showKidsInputs && 

            <form className='profile-form'>

            <input type="text"
                placeholder="child name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
             />
        <input type="text"
                placeholder="age in months"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
             />
             <input type="text"
                placeholder="gender"
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
             />
       
        
        
        { !showSubmitButton && 
       <div className='button-wrapper'>
            <button onClick={saveForm} className="profile-button" >Next child</button>
            <button onClick={()=>setShowSubmitButton(true)} className="profile-button">Done</button>
       </div>
       
       } 
        
        {showSubmitButton && <button onClick={submitForm} className="profile-button"> Send</button>}
        
        
        </form>

        }
    </div>
)
}
export default ProfileForm