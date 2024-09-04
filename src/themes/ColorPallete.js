import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: {
      main: "#0098C9",//#154792
      light: "rgba(21, 71, 146, 0.65)",
      dark: "",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.3)",
      contrastText:'#040921',
      /* M3/sys/light/secondary */
      light:' #625B71;'

    },


  },

  typography: {
    fontFamily: 'Open Sans, sans-serif,',
    // fontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: '2.6rem',
      fontFamily:'open Sans',
      
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.4rem',
      fontFamily:'open Sans',

    },
    h3: {
      fontWeight: 700,
      fontSize: '2.2rem',
      fontFamily:'open Sans',

    },
    h4: {
      fontWeight: 800,
      fontSize: '1.75rem',
      fontFamily:'open Sans',

    },
    h5: {
      fontWeight: 700,
      fontSize: '1rem',
      fontFamily:'open Sans',

    },
    h6: {
      fontWeight: 600,
      fontFamily:'open Sans',

    },
    p: {
      fontWeight: 400,
      fontSize:'12px',
      fontFamily:'open Sans',

    },
    span: {
      fontWeight: 500,
      fontSize: '13px',
      lineHeight: '16px',
      color: 'rgba(0, 0, 0, 0.6)',
      fontFamily:'open Sans',

    }
  },
  action:{
    hover:'#D8E8FF'
  }
  
  

  
  // components: {
  // },

});