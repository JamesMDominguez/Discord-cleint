import styles from '../styles/Home.module.css'
import { gql,useQuery } from '@apollo/client'
import * as React from 'react';
import MessageInput from '../components/messageInput';

export default function Home() {
  const GET_USER_DATA = gql`
query GetMessages($channelId: String!) {
  getMessages(channelID: $channelId) {
    id
    content
    user {
      name
      profile_image
    }
  }
}`

  const MESSAGE_SUB = gql`
query GetMessages($channelId: String!) {
  getMessages(channelID: $channelId) {
    id
    content
    user {
      name
      profile_image
    }
  }
}
`
  const USER_INFO = gql`
  query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    name
    memberships {
      server {
        name
        channels {
          name
        }
      }
    }
  }
}
  `

const myuser = useQuery(USER_INFO,{variables: {getUserId: "62f2bae44c33fa6071e4149a"}})
console.log(data)
const { data, loading, subscribeToMore } =  useQuery(GET_USER_DATA, {
    variables: {
      channelId: "62f74d50962a12ca3120776a",
    }
  });
  
  subscribeToMore({
      document: MESSAGE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageCreated;
        const exists = prev.getMessages.find(
          ({ id }) => id === newFeedItem.id
        );
        if (exists) return prev;
        console.log(prev)
        return Object.assign({}, prev, {
          getMessages:  [...prev.getMessages,newFeedItem]
        });
      }
    })
  
  if(loading){
    return <p>loading...</p>
  }
  else{
    console.log(data)
      return(
        <>
        <div class="servers">
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5ODE0MmFjLWY0MTAtNDIzYS1iZjBiLTM0YzljYjVkOTYwOVwvZGJ0aWY1ai02MDMwNjg2NC1kNmI3LTQ0YjYtYTlmZi02NWU4YWRjZmI5MTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pRh5DK_cxlZ6SxVPqoUSsSNo1fqksJVP6ECGVUi6kmE' style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}}/>
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5ODE0MmFjLWY0MTAtNDIzYS1iZjBiLTM0YzljYjVkOTYwOVwvZGJ0aWY1ai02MDMwNjg2NC1kNmI3LTQ0YjYtYTlmZi02NWU4YWRjZmI5MTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pRh5DK_cxlZ6SxVPqoUSsSNo1fqksJVP6ECGVUi6kmE' style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}}/>
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5ODE0MmFjLWY0MTAtNDIzYS1iZjBiLTM0YzljYjVkOTYwOVwvZGJ0aWY1ai02MDMwNjg2NC1kNmI3LTQ0YjYtYTlmZi02NWU4YWRjZmI5MTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pRh5DK_cxlZ6SxVPqoUSsSNo1fqksJVP6ECGVUi6kmE' style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}}/>
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5ODE0MmFjLWY0MTAtNDIzYS1iZjBiLTM0YzljYjVkOTYwOVwvZGJ0aWY1ai02MDMwNjg2NC1kNmI3LTQ0YjYtYTlmZi02NWU4YWRjZmI5MTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pRh5DK_cxlZ6SxVPqoUSsSNo1fqksJVP6ECGVUi6kmE' style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}}/>
        </div>

        <div class="channels">
        </div>

        <div className='channelName'>
        </div>

        <div className='serverMembers'>
        </div>

        <div className='messages'>
          <div style={{bottom:"0rem"}}>
          {data.getMessages.map((message)=>{
            return(
              <div style={{display:"flex"}}>
              <img src={message.user.profile_image} style={{width:"3rem",height:"3rem",borderRadius:"50%",margin:"10px"}}/>
              <div>
              <p>{message.user.name}</p>
              <p style={{color:"white"}}>{message.content}</p>
              </div>
              </div>
            )
          })}
          </div>
        </div>

        <div className='channelNav'>
        </div>

        <div className='msgInput'>
          <MessageInput/>
        </div>
        
        </>
      )
    }
  }
