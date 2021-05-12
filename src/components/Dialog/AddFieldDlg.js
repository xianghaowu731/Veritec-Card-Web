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

export default function AddFieldDlg({

  open = false,
  onCancel,
  onAdd,
  handleClose,
}) {
  // const fields = [
  //   {
  //     label: 'Text',
  //     type: 'text',
  //   },
  //   {
  //     label: 'Number',
  //     type: 'number',
  //   },
  //   {
  //     label: 'Email',
  //     type: 'email',
  //   },
  //   {
  //     label: 'Phone Number',
  //     type: 'phone',
  //   },
  // ]

  // const [selList, setSelList] = React.useState([])
  const [label, setLabel] = React.useState('')
  const [value, setValue] = React.useState('text')



  const handleChange = event => {
    const name = event.target.name
    const checked = event.target.checked

    let newData = fields.filter(one => {
      if (one == name) {
        return !!checked
      } else {
        return selList.indexOf(one) != -1
      }
    })

    setSelList(newData)
  }

  const handleAdd = () => {
    if(!label)
    {
      return 
    }
    if (onAdd) {
      onAdd(label, value)
    }
  }

  const handleChangeType = event => {
    setValue(event.target.value)
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
          <Typography variant="body1">Add a field</Typography>
        </div>
        <TextField
          required
          id="filled-required"
          label="Label"
          type="text"
          variant="filled"
          value={label}
          onChange={e => {
            setLabel(e.target.value)
          }}
          fullWidth
        />
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <RadioGroup
            aria-label="fields"
            name="fields"
            value={value}
            onChange={handleChangeType}
          >
            <FormControlLabel value="text" control={<Radio color="primary"/>} label="Text" />
            <FormControlLabel
              value="number"
              control={<Radio  color="primary"/>}
              label="Number"
            />
            <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" />
            <FormControlLabel
              value="phone"
              control={<Radio color="primary" />}
              label="Phone Number"
            />
          </RadioGroup>
        </FormControl>

        {/* {fields.map((one, index) => {
          return (
            <div key={Utils.getKey()}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selList.indexOf(one) != -1}
                    onChange={handleChange}
                    name={one.label}
                    color="primary"
                  />
                }
                label={one}
              />
            </div>
          )
        })} */}
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: '10px 15px',
        }}
      >
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" autoFocus disabled={!label}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
