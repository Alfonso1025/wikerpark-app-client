const ViewBackground = (props)=>{
  //recibe props
  const image = props.image
  
    return(
        <div>
            
            image  <img src={image.url} alt="" srcSet="" />
   
            
        </div>
    )
}

export default ViewBackground