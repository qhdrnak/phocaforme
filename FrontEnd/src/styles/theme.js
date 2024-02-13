import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB37A3',
    },
    secondary: {
      main: '#FD9DD1',
    },
    warning: {
      main: 'rgba(142, 96, 203, 1)',
    },
    info: {
        main: '#FFFFFF'
    },
    success: {
      main: 'rgba(135, 141, 150, 1)'
    }

  },

  components: {
    
    MuiGrid: {
      styleOverrides: {
        root: {
        }
      }
    },
    
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FD9DD1', 
          width: '10rem'
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
        }

      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: 'Pretendard'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard'
        }
      }
    }, 
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
          padding: '0rem 1rem',
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '18px'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: "10rem",
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // minWidth: "8rem",
          width: "calc(50vw-1rem)",
          // marginRight: "16px",
          marginBottom: "16px",
          cursor: "pointer",
        },
      
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Cafe24SSurround',
        }
        
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input': {
            fontFamily: 'Pretendard',
            fontSize: '15px',
          },
          
        },
      }
    },
    
  
  }
});

export default theme;
