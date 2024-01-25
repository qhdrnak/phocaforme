import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB37A3',
    },
    secondary: {
      main: '#FD9DD1',
    },
    info: {
        main: '#FFFFFF'
    }
  },

  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FD9DD1', // Menu의 배경색
        },
        list: {
          backgroundColor: '#FD9DD1', // Menu 아이템의 배경색
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          fontSize: '10px'
        }

      }
    },
  
  }
});

export default theme;
