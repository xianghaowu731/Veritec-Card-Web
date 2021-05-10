import { makeStyles } from '@material-ui/core/styles'
import { VColor } from './constants'

const useStyles = makeStyles(theme => ({
    formRoot: {
      '& > *': {
        marginBottom: theme.spacing(0),
      },
    },
    grow:{
      flexGrow:1,
    },
    tollbar: {
      minHeight: 55,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    menuList:{    
      width: 220,    
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5
    },
    rootContainer: {
      padding: 0,  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },

    paper: {
      maxWidth: 350,
      width: '80%',
      paddingTop: 60,
      paddingBottom: 30,
    },
    aboutTermScrollRoot:{
      maxWidth: '80vw',
      maxHeight: 'calc(100vh - 180px)', 
      flexGrow:1,
      overflow: 'auto',  
    },
    descScrollRoot:{
      
      maxHeight: '35vh', 
      
      overflow: 'auto',  
      
    },
    signin: {
        float: 'right',
    },

    cardViewGrid: {
      padding: theme.spacing(2),      
      color: theme.palette.text.secondary,
      flexGrow:1 
    },

    cardViewGridLeft:{
      padding: theme.spacing(2),      
      color: theme.palette.text.secondary,
      flexGrow:1 ,
      minWidth: 300,
      maxWidth: 338,
    },

    cardViewRoot:{
      maxWidth: '100vw',
      padding: 20,
      paddingBottom: 5,
      height:'calc(100vh - 70px)',
      overflow:'auto',
      position:'relative',
      
    },

    cardTitle:{
      fontSize: 15,
      color: VColor.black,      
    },
    cardNumber:{
      fontSize: 15,
      color: VColor.darkGray,      
    },

    labelText:{
      fontSize: 12,
      color: VColor.darkGray,      
    },

    mainText:{
      fontSize: 16,
      color: VColor.darkGray,      
    },

  }))
  
  export const forgotPwdStyles = makeStyles(theme => ({
    formRoot: {
      '& > *': {
        marginBottom: theme.spacing(4),
      },
    },
    signin: {
      float: 'right',
    },
    rootContainer: {
      padding: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    paper: {
      maxWidth: 400,
      width: '80%',
      paddingTop: 60,
    },

  }))
  
  export const indexStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        marginBottom: theme.spacing(4),
      },
    },
    signin: {
      float: 'right',
    },
    rootContainer: {
      padding: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    paper: {
      maxWidth: 400,
      width: '80%',
      paddingTop: 60,
    },
  }))
  
  export const pwdResetStyles = makeStyles(theme => ({
    formRoot: {
      '& > *': {
        marginBottom: theme.spacing(4),
      },
    },
    signin: {
      float: 'right',
    },
    rootContainer: {
      padding: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    paper: {
      maxWidth: 400,
      width: '80%',
      paddingTop: 60,
      paddingBottom: 30,
    },
  }))
  

  


  export default useStyles;