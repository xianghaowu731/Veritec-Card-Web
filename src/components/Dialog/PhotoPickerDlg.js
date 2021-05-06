
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PhotoPickerDlg({title, open, onUpload, onCamera, handleClose}) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
        <DialogContent style={{minWidth: 250}}>
          <DialogContentText id="alert-dialog-description">            
          {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding: '10px 15px'}}>
          <Button onClick={onUpload} color="primary" >
            upload
          </Button>
          <Button onClick={onCamera} color="primary" autoFocus>
            camera
          </Button>
        </DialogActions>
      </Dialog>
  )
}
