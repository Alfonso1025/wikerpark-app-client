import React, {useState} from 'react'

function ProfileForm (){

const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [age, setAge] = useState('')
const [medication, setMedication] = useState('')
const [instruccions, setInstruccions] = useState('')

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
                placeholder="medication"
                value={medication}
                onChange={(e)=>setMedication(e.target.value)}
             />
             <input type="text"
                placeholder="meds instruccions"
                value={instruccions}
                onChange={(e)=>setInstruccions(e.target.value)}
             />
        </form>
    </div>
)
}
export default ProfileForm