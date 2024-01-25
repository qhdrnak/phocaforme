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
          right: 0,
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
          vertical: 'top',
          horizontal: 0,
        }}
      >
        <Typography sx={{ p: 3 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div

            >
              교환
            </div>
            <button
              onClick={() => {
                navigate("/write");
              }}
            >
              판매
            </button>
          </div> 
        </Typography>
      </Popover>
      </Fab>
    </Box>
  );
}