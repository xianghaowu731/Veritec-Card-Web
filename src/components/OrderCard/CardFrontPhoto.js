import React from 'react'
import useStyles from '../../utils/styles'

import { Fade, Grid, Paper, Button } from '@material-ui/core'
import CardFront from '../../assets/images/card-front.png'
import Constants, { VColor } from '../../utils/constants'
import { useTheme } from '@material-ui/core'
import PhotoPickerDlg from '../../components/Dialog/PhotoPickerDlg'

export default function CardFrontPhoto({ editMode = true, cardFrontImage }) {
  const classes = useStyles()
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }
  const [curImg, setCurImg] = React.useState()
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
        }}
        elevation={4}
      >
        <div>
          <img
            src={curImg}
            style={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              marginBottom: 0,
              borderRadius: 7,
              display:curImg ? 'block' : 'none'
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

        handleClose={() => {
          setOpenPicker(false)
        }}
        onResult={img=>{
          setCurImg(img)
          setOpenPicker(false)
        }}
      />
    </Paper>
  )
}
