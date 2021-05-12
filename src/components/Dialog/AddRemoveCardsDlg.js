import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Utils from '../../utils/utils'
import { TextField } from '@material-ui/core'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function AddRemoveCardsDlg({
  open = false,
  onCancel,
  onAdd,
  addMode = true,
  handleClose,
}) {
  const [start, setStart] = React.useState('')
  const [end, setEnd] = React.useState('')

  const handleAdd = () => {
    if (!start || !end) {
      return
    }
    if (onAdd) {
      onAdd(start, end)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ minWidth: 400, paddingTop: 20 }}>
        <div>
          <Typography variant="body1">
            {addMode ? 'Add cards to program' : 'Remove cards from program'}
          </Typography>
        </div>
        <TextField
          required
          id="filled-required"
          label="Starting Card Number"
          type="text"
          variant="filled"
          value={start}
          onChange={e => {
            setStart(e.target.value)
          }}
          fullWidth
          style={{marginBottom: 20, marginTop: 20}}
        />

        <TextField
          required
          id="filled-required"
          label="Ending Card Number"
          type="text"
          variant="filled"
          value={end}
          onChange={e => {
            setEnd(e.target.value)
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 15px',
        }}
      >
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          autoFocus
          disabled={!start || !end}
        >
          {
            addMode ? 'Add' : 'remove'
          }
        
        </Button>
      </DialogActions>
    </Dialog>
  )
}
