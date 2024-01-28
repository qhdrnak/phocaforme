import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


export default function FloatingActionButtons() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{
          position: 'fixed',
          bottom: 10,
          right: 500,
          '& > :not(style)': { m: 1 } 
        }}
      >
      <Fab 
        color="primary" 
        aria-label="add"
      >
        <AddIcon 
          onClick={handleClick}
        />
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: -100,
          vertical: 100,
        }}
      >
        <Typography 
          sx={{
            p: 1,
            width: 70
          }}
          >
            <button
              onClick={() => {
                navigate("/write");
              }}
              width='100px'
            >
              글쓰기
            </button>
        </Typography>
      </Popover>
      </Fab>
    </Box>
  );
}