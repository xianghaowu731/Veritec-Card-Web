import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function ProgressDlg({ textContent, open, value, onStop, handleClose }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ minWidth: 250, paddingTop: 20, }}>
        {textContent}
        <div style={{marginTop: 20}}></div>
        <LinearProgress variant="determinate" value={value} />
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: '10px 15px',
        }}
      >
        <Button  onClick={onStop} color="primary" autoFocus>
          Stop
        </Button>
      </DialogActions>
    </Dialog>
  )
}
