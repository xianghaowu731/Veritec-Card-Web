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

export default function CardFrontBack({ editMode = false }) {
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
          src={CardFront}
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
          width: '100%',
          paddingTop: Constants.cardSize.paddingTop,
          position: 'relative',
          marginTop: 30,
        }}
        elevation={4}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            margin: `${Constants.cardSize.getMargin(100)}%`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <img
              src={cardLogo}
              style={{
                width: '40%',
                objectFit: 'contain',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
              }}
            >
              <div>
                <span className={classes.cardTitle}>David Tennant</span>
                <span
                  className={classes.cardNumber}
                  style={{ display: 'block' }}
                >
                  5555-5555-5555-5555
                </span>
              </div>

              <div style={{ resize: 'vertical', heihgt: 'auto' }}>
                <img
                  src={modelImg}
                  style={{
                    width: `${Constants.cardSize.photoRate * 100}%`,
                    objectFit: 'contain',
                    margin: 0,
                    marginBottom: -8,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
              }}
            >
              <img
                src={matrix}
                style={{
                  width: `${Constants.cardSize.codeRate * 100}%`,
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  margin: 0,
                  marginBottom: 0,
                }}
              />
            </div>
          </div>
        </div>
      </Paper>

      <div style={{ marginTop: 20, position: 'relative' }}>
        <img
          src={modelImg}
          style={{ width: '100%', objectFit: 'contain', marginBottom: 10 }}
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
      <div className={classes.mainText}>Ordered: 01/01/1970 - user@email.com</div>
      <div className={classes.mainText}>Printed: 01/01/1970 - user@email.com</div>
      <div className={classes.mainText}>NFC: 01/01/1970 - user@email.com</div>
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
