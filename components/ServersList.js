import { gql,useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export default function MessageInput() {
    const router = useRouter()

    const USER_INFO = gql`
    query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      memberships {
        server {
          id
          name
          server_image
        }
      }
    }
  }`
  
  const {data,loading} = useQuery(USER_INFO,{variables: {getUserId: "62f2bae44c33fa6071e4149a"}})
  if(loading) return <div className="servers"></div>
    return(
      <div className="servers">
        {data.getUser.memberships.map((membership)=>{
            return <img key={membership.server.id} src={membership.server.server_image} style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}} onClick={()=>router.push(`/channels/${membership.server.id}/`)}/>
        })}
      </div>
    )
}