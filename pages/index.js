import styles from '../styles/Home.module.css'
import { gql,useQuery } from '@apollo/client'

export default function Home() {
  const GET_USER_DATA = gql`
query GetMessages($channelId: String!) {
  getMessages(channelID: $channelId) {
    id
    content
  }
}`

  const MESSAGE_SUB = gql`
  subscription MessageCreated {
  messageCreated {
    id
    content
  }
}
`
const { data, loading, error, subscribeToMore } =  useQuery(GET_USER_DATA, {
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
      return(
        <>
          {
            data.getMessages.map((message)=>{
              return(
                <p key={message.id}>{message.content}</p>
              )
            })
          }
        </>
      )
    }
  }
