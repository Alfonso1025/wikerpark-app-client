import React, {useState} from 'react'

function ProfileForm (){

const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [age, setAge] = useState('')
const [gender, setGender] = useState('')
const [medication, setMedication] = useState('')
const [instruccions, setInstruccions] = useState('')

const [kidsArray, setKidsArray] = useState([])
let kid = {name, age, gender, medication,instruccions }
console.log(kidsArray)

function saveForm(e){
    e.preventDefault()
    const newKidsArray = [...kidsArray, kid]
    setKidsArray(newKidsArray)
    setName('')
    setAge('')
    setGender('')
    setMedication('')
    setInstruccions('')
}

function submitForm(e){
    e.preventDefault()
    const body = {address, kidsArray}
    try {
       const response = fetch('http://localhost:3003/dashboard/profileform',{
           method:'POST',
           headers:{'content-type':'application/json', token:localStorage.token},
           body:JSON.stringify(body)
       })
       const form = response.json() 
       console.log(form)
    } 
    catch (error) {
        console.log(error)
    }
}
    return(
    <div>
        <form>
        <input type="text"
                placeholder="address in Chicago"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
             />
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
        <input type="text"
                placeholder="medication"
                value={medication}
                onChange={(e)=>setMedication(e.target.value)}
             />
             <input type="text"
                placeholder="meds instruccions"
                value={instruccions}
                onChange={(e)=>setInstruccions(e.target.value)}
             />
        <button onClick={saveForm} >Save</button>
        <button onClick={submitForm}> Send</button>
        </form>
    </div>
)
}
export default ProfileForm