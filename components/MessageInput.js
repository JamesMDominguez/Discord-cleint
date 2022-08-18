import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { gql,useMutation } from '@apollo/client'
import { useState } from 'react';

const CREATE_MSG = gql`mutation CreateMessage($content: String!, $userId: String!, $channelId: String!, $deleted: Boolean!) {
    createMessage(content: $content, userID: $userId, channelID: $channelId, deleted: $deleted) {
      id
      content
    }
  }`;

export default function MessageInput({currentChannel}){
    const [createMSG] = useMutation(CREATE_MSG)
    const [msg,setMsg] = useState("")
    const handleChange = (e) => setMsg(e.target.value)
    return(
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#40444B' }}
    >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
            <AddCircleIcon sx={{ color: '#B9BBBE' }} />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1, color: '#9e9e9e' }}
            placeholder="Messages"
            value={msg}
            onChange={handleChange}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                   e.preventDefault()
                   createMSG({
                    variables: {
                      content: msg,
                      userId:"62f2bb164c33fa6071e4149c",
                      channelId: currentChannel,
                      deleted: false
                    }
                  })
                  setMsg("")
                }
             }}
        />
    </Paper>
    )
}