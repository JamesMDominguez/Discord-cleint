import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function MessageInput(){
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
            inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            +
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            +
        </IconButton>
    </Paper>
    )
}