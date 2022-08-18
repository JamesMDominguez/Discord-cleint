import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

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
subscription MessageCreated {
  messageCreated {
    id
    content
  }
}
`


export default function MessageList() {
    const router = useRouter()
    const { id = [] } = router.query
    const { data, loading, error, subscribeToMore } = useQuery(GET_USER_DATA, { variables: { channelId: id[1] } });

    subscribeToMore({
        document: MESSAGE_SUB,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newFeedItem = subscriptionData.data.messageCreated;
            const exists = prev.getMessages.find(
                ({ id }) => id === newFeedItem.id
            );
            if (exists) return prev;
            return Object.assign({}, prev, {
                getMessages: [...prev.getMessages, newFeedItem]
            });
        }
    })

    if (loading || data === 'undefined') return <div />;
    if (error) {
        console.error(error);
        return null;
    }

    return (
        <>
            {
                data.getMessages.map((message) => {
                    return (
                        <div key={message.id} style={{ display: "flex" }}>
                            <img src={message.user.profile_image} style={{ width: "3rem", height: "3rem", borderRadius: "50%", margin: "10px" }} />
                            <div>
                                <p style={{ margin: "0px", color: "#325ea8", paddingTop: "10px" }}>{message.user.name}</p>
                                <p style={{ color: "white", marginTop: "5px" }}>{message.content}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}