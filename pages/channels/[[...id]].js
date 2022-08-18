import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import MessageList from '../../components/MessageList'
import MessageInput from '../../components/MessageInput'
import { useEffect, useState } from 'react'
import User from '../../components/User'
import MemberList from '../../components/MemberList'

const CHANNELS = gql`query GetChannels($serverId: ID!) {
    getChannels(serverID: $serverId) {
        name
        id
      server {
        name
        id
      members {
        id
          user {
            name
            profile_image
          }
        }
      }
    }
  }`

export default function Channel() {
    const [currentChannel, setCurrentChannel] = useState([])
    const router = useRouter()
    const { id = [] } = router.query
    const {data,loading} = useQuery(CHANNELS,{variables: {serverId: id[0]}})

    useEffect(()=>{
        if(!loading){
            setCurrentChannel([data.getChannels[0].name,data.getChannels[0].id])
            router.push(`${id[0]}/${data.getChannels[0].id}`)
        }
    },[id.length,loading])

    if(loading){
        return <p style={{color:"white"}}>loading...</p>
    }


    return (
            <>
                <div className="channels">
                    {
                        data.getChannels.map((channel)=>{
                            return(
                                <div key={channel.id} onClick={()=> {
                                    router.push(`${id[0]}/${channel.id}`)
                                    setCurrentChannel([channel.name,channel.id])
                                    }}>
                                 <p style={{color:"#8E9297",marginLeft:"10px"}}># {channel.name}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='channelName' style={{color:"white",textAlign: "center",paddingTop:"10px"}}>
                    <h3 style={{margin:"0px"}}>{data.getChannels[0].server.name}</h3>
                </div>

                <div className='serverMembers'>
                    <MemberList members={data.getChannels[0].server.members}/>
                </div>

                <div className='messages'>
                    <MessageList/>
                </div>

                <div className='channelNav' style={{color:"white",paddingTop:"10px"}}>
                    <h3 style={{margin:"0px",marginLeft:"20px"}}># {currentChannel[0]}</h3>
                </div>

                <div className='msgInput'>
                    <MessageInput currentChannel={currentChannel[1]}/>
                </div>

 
            </>
        )
    
}

