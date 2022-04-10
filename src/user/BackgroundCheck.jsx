import React, {useState} from 'react';

const BackgroundCheck=(props)=>{
    //recibe props
    const id = props.id
    //store the image in a state variable
    const [image, setImage] = useState('')
    console.log(image)
    
    const handleImageInput= (e)=>{
        
        setImage(e.target.files[0])
    }
    
    const sendImageToserver=async (e)=>{
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("file",image)
            const imageTosend= await fetch(` http://localhost:3003/dashboard/uploadbackground/${id}`,{
                method:'POST',
                body:data
            })
            console.log(imageTosend)
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={sendImageToserver}>
                <input type="file" 
                
                onChange={handleImageInput}
                 accept="image/*"/>
                <button>upload</button>
            </form>
        </div>
    )
}
export default BackgroundCheck