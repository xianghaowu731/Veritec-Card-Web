import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import useStyles from '../../utils/styles'

import { Fade, Grid, Paper, Button } from '@material-ui/core'
import cardFrontImg from '../../assets/images/card-front.png'
import cardLogo from '../../assets/images/logo.png'
import matrix from '../../assets/images/matrix.png'
import Constants, { VColor } from '../../utils/constants'
import modelImg from '../../assets/images/model.jpeg'
import logoimg from '../../assets/images/logo.png'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Zoom from '@material-ui/core/Zoom'
import { useTheme } from '@material-ui/core'
import Utils from '../../utils/utils'
import PhotoPickerDlg from '../../components/Dialog/PhotoPickerDlg'

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function CardProgramsLeft({ isCreateMode = false, editMode = false, disabledProgram=false }) {
  const classes = useStyles()
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }


  const [cardFront, setCardFront ] = React.useState( isCreateMode ? undefined : cardFrontImg)
  const [logo ,setLogo] = React.useState(isCreateMode ? undefined : logoimg)

  const [openPicker, setOpenPicker] = React.useState(false)

  return (
    <Paper elevation={0}>
      <div
        style={{
          width: '100%',
          paddingTop: Constants.cardSize.paddingTop,
          position: 'relative',
          borderRadius: 7,
        }}
      >
        <img
          src={cardFront}
          ref={el => {
            if (!el) {
              console.log('el is null')
              return
            }
            console.log(el.getBoundingClientRect().width) // prints 200px
          }}
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            // objectFit: 'contain',
            borderRadius: 7,
          }}
        />
        <Fade in={editMode}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: editMode
                ? VColor.opacityBlack
                : VColor.transparent,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{ color: VColor.white }}
              onClick={() => {
                setOpenPicker(true)
              }}
            >
              change photo
            </Button>
          </div>
        </Fade>
      </div>
    
      <div style={{ marginTop: 20, position: 'relative' }}>
        <img
          src={logo}
          style={{ width: '100%', objectFit: 'contain', minHeight: 80, marginBottom: 10 }}
        />
        <Fade in={editMode}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 17,
              top: 0,
              backgroundColor: editMode
                ? VColor.opacityBlack
                : VColor.transparent,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{ color: VColor.white }}
              onClick={() => {
                setOpenPicker(true)
              }}
            >
              change photo
            </Button>
          </div>
        </Fade>
      </div>
      <div>
      <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="BlinxPay Card"
          labelPlacement="start"
          style={{marginLeft: 0}}
        />
      </div>
      <div>
        <Button color="primary" disabled={!disabledProgram} style={{marginLeft:-8}} onClick={()=>{
          navigate('/admin/card-programs/manage/cards')
        }}>
          Manage cards
        </Button>
      </div>

      <div className={classes.mainText}>Program ID: 0000001</div>
      <div className={classes.mainText}>Created: 01/01/1970</div>
      <div className={classes.mainText}>Status: Enabled</div>
      <div className={classes.mainText}>BlinxPay: Yes</div>
      <PhotoPickerDlg
        open={openPicker}
        title={'Replace Photo?'}
        onUpload={() => {
          setOpenPicker(false)
        }}
        onCamera={() => {
          setOpenPicker(false)
        }}
        handleClose={() => {
          setOpenPicker(false)
        }}
      />
    </Paper>
  )
}
