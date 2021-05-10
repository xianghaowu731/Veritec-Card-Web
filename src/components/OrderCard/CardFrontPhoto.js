import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import useStyles from '../../utils/styles'

import { Fade, Grid, Paper, Button } from '@material-ui/core'
import CardFront from '../../assets/images/card-front.png'
import cardLogo from '../../assets/images/logo.png'
import matrix from '../../assets/images/matrix.png'
import Constants, { VColor } from '../../utils/constants'
import modelImg from '../../assets/images/model.jpeg'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Zoom from '@material-ui/core/Zoom'
import { useTheme } from '@material-ui/core'
import Utils from '../../utils/utils'
import PhotoPickerDlg from '../../components/Dialog/PhotoPickerDlg'

export default function CardFrontPhoto({ editMode = true, cardFrontImage }) {
  const classes = useStyles()
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

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
          src={cardFrontImage ? cardFrontImage : CardFront}
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
      </div>

      <Paper
        style={{
          marginTop: 20,
          position: 'relative',
          borderRadius: 7,
          height: 300,
          // border:'1px solid green'
        }}
        elevation={4}
      >
        <div
          style={
            {
              //  border: '1px solid red',
            }
          }
        >
          <img
            src={modelImg}
            style={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              marginBottom: 0,
              borderRadius: 7,
              display:'none'
              // border: '1px solid blue',
            }}
          />
        </div>

        <Fade in={editMode}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              borderRadius: 7,
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
              Add a photo
            </Button>
          </div>
        </Fade>
      </Paper>

      <PhotoPickerDlg
        open={openPicker}
        title={'Add a photo?'}
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
