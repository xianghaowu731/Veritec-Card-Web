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


export default function CardProgramsDlg({
  selPrograms = [],
  open,
  onCancel,
  onAdd,
  handleClose,
}) {
  const totalPrograms = [
    'Card Type1',
    'Card Type2',
    'Card Type3',
    'Card Type4',
    'Card Type5',
    'Card Type6',
    'Card Type7',
    'Card Type8',
    'Card Type9',
    'Card Type10',
  ]

  
  const [selList, setSelList] = React.useState([])

  React.useEffect(()=>{
    setSelList(selPrograms)
  }, [selPrograms])

  const handleChange = event => {
    const name = event.target.name
    const checked = event.target.checked

    let newData = totalPrograms.filter(one => {
      if (one == name) {
        return !!checked
      } else {
        return selList.indexOf(one) != -1
      }
    })

    setSelList(newData)
  }

  const handleAdd = () => {
    if (onAdd) {
      onAdd(selList)
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
          <Typography variant="body1">Select Card Programs to add</Typography>
        </div>

        {totalPrograms.map((one, index) => {
          return (
            <div key={Utils.getKey()}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selList.indexOf(one) != -1}
                    onChange={handleChange}
                    name={one}
                    color="primary"
                  />
                }
                label={one}
              />
            </div>
          )
        })}
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
        <Button onClick={handleAdd} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
