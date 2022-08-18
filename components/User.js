export default function User({user}) {
    return(
      <div style={{display:"flex"}}>
        <img key={user.id} src={user.profile_image} style={{width:"2rem",height:"2rem",margin:"auto",marginLeft:"10px",marginRight:"10px",borderRadius:"50%",marginBottom:"8px"}}/>
        <p style={{color:"white"}}>{user.name}</p>
      </div>
    )
}