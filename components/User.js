import { gql,useQuery } from '@apollo/client'

const USER = gql`
query GetUser($getUserId: ID!) {
getUser(id: $getUserId) {
id
name
email
profile_image
}
}`


export default function MessageInput() {
  const {data,loading} = useQuery(USER,{variables: {getUserId: "62f2bae44c33fa6071e4149a"}})

  if(loading) return <div></div>
    return(
      <div style={{display:"flex"}}>
        <img key={data.getUser.id} src={data.getUser.profile_image} style={{width:"2rem",height:"2rem",margin:"auto",marginLeft:"10px",marginRight:"10px",borderRadius:"50%",marginBottom:"8px"}}/>
        <p style={{color:"white"}}>{data.getUser.name}</p>
      </div>
    )
}