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
    MuiFab: {
      styleOverrides: {
        root:{
          width: '15vw',
          height: '15vw'
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: "10px",
        }
      }
    },
    
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FD9DD1', 
          padding: '0.5rem',
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
          fontFamily: 'Pretendard',
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
          fontSize: '18px',
        },
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          height: "13rem",
          width: "10rem",
          
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '0.5rem 0 0 0',
          width: "fit-content",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center'
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
