import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const BackgroundCheck=(props)=>{
    const remoteServer = process.env.REACT_APP_REMOTE_SERVER
    const navigate = useNavigate();
    //recibe props
    const id = props.id
    
    //store the image in a state variable
    const [image, setImage] = useState('')
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('could not upload file')
    
    const handleImageInput= (e)=>{
        
        setImage(e.target.files[0])
    }
    
    const sendImageToserver=async (e)=>{
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("file",image)
            const sendImage= await fetch( `${remoteServer}/dashboard/uploadbackground/${id}`,{
                method:'POST',
                body:data
            })
            const response =await  sendImage.json()
            if(response.code !==200){
                setStatus('ERROR')
                console.log(response.message)
                setTimeout(()=>{setStatus('')}, 3000)
                return
            }
            else if(response.code === 200 && response.message === 'file_uploaded'){
                setStatus('SUCCESS')
                navigate('/')
            }
            console.log(sendImage)
        } 
        catch (error) {
            console.log(error)
        }
    }
   if(status === 'ERROR') return <h1>{errorMessage}</h1>
    return(
        <div className='backgroundcheck-wrapper'>
            <h3 className='backgroundcheck-h1'>Upload your background check</h3>
            <form className='backgroundcheck-form' onSubmit={sendImageToserver}>
                <input type="file" 
                onChange={handleImageInput}
                 accept="image/*"
                 className='backgroundcheck-input'
                 />
            
                <button className='backgroundcheck-button'>upload</button>
            </form>
        </div>
    )
}
export default BackgroundCheck