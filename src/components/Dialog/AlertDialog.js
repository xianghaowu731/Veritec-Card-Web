
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: '90vw'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="subtitle2" style={{fontStyle:'normal'}}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export function AlertDlg({title, body, okTitle="Ok", cancelTitle="Cancel", isOpen, onOk, onCancel, onClose}) {
  // const [open, setOpen] = React.useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOk = () => {
    onClose()
    onOk();
  };

  const handleCancel = ()=>{
    onClose()
    onCancel()
  }


  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        
        <DialogContent dividers>
          <Typography gutterBottom>
            {body}
          </Typography>          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="secondary">
            {cancelTitle}
          </Button>
          <Button autoFocus onClick={handleOk} color="primary">
            {okTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default class AlertDialog extends React.Component{


  constructor(props){
    super(props)    
    this.state = {
      isOpen: false
    }
  }

  componentDidMount(){

  }
  componentWillUnmount(){

  }

  showDialog = (title, body)=>{
    this.setState({
      isOpen: true,
      title: title,
      body: body
    })
  }

  close = ()=>{
    this.setState({ isOpen: false})
  }

  onOk = ()=>{
    if(this.props.onOk){
      this.props.onOk()
    }
    close()
  }

  render(){

    const {
      title, body, isOpen
    } = this.state

    return <AlertDlg title={title} body={body} isOpen={isOpen} onOk={this.onOk} onCancel={this.close} onClose={this.close}/>
  }
}
