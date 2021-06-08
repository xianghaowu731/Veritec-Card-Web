import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, navigate } from 'gatsby'
import { connect, useDispatch, useSelector } from 'react-redux'

import { Button, Paper, Typography } from '@material-ui/core'
import Webcam from 'react-webcam'
import { VColor } from '../../utils/constants'
import Cropper from 'react-easy-crop'

import getCroppedImg from '../cropping/cropImage'

const videoConstraints = {
  width: 600,
  height: 600,
}

export default function WebCamView(props) {
  const [capturedData, setCapturedData] = React.useState()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setCapturedData(imageSrc)
    console.log('captured image :', imageSrc)
  }, [webcamRef])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(
      'croppedArea, croppedAreaPixels: ',
      croppedArea,
      croppedAreaPixels
    )
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(capturedData, croppedAreaPixels)
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const webcamRef = React.useRef()

  const handleCrop = () => {
    showCroppedImage()
  }

  const handleCancel = () => {
    setCroppedImage(null)
    setCapturedData(null)
  }

  const handleContinue = ()=>{
    navigate('/scan-card/view')
  }

  return (
    <Paper
      elevation={0}
      style={{
        width: '80vw',
        height: '80vw',
        maxWidth: 600,
        maxHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        // border: '1px solid red',
      }}
      // onClick={props.onClick}
    >
      {!capturedData ? (
        <>
          <div style={{ marginTop: 30, position: 'relative' }}>
            <Webcam
              audio={false}
              height={'100%'}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={'100%'}
              videoConstraints={videoConstraints}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'center',
                width: '100%',
                height: '30%',
                backgroundColor: VColor.opacityBlack,
                zIndex: 1000,
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '70%',
                left: 0,
                width: '100%',
                height: '28%',
                backgroundColor: VColor.opacityBlack,
                zIndex: 1001,
                textAlign: 'center',
                paddingTop: '20%',
              }}
            >
              <Button
                variant="text"
                style={{ color: 'white' }}
                onClick={capture}
              >
                Click Here to Capture
              </Button>
              {/* <Typography style={{color:'white', }}>  </Typography> */}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: 0,

                width: '30%',
                height: '40%',
                backgroundColor: VColor.opacityBlack,
                zIndex: 1000,
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '70%',

                width: '30%',
                height: '40%',
                backgroundColor: VColor.opacityBlack,
                zIndex: 1000,
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '30%',
                border: '1px solid green',
                width: '40%',
                height: '40%',
                zIndex: 1000,
                textAlign: 'center',
              }}
            ></div>
          </div>
        </>
      ) : null}

      {capturedData && !croppedImage ? (
        <div>
          <Cropper
            image={capturedData}
            crop={crop}
            zoom={zoom}
            style={{
              containerStyle: { position: 'relative', width: 600, height: 600, marginTop: 65 },
            }}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div
            style={{
              width: '100%',
              marginTop: -60,
              textAlign:'center'
            }}
          >
            <Button
              onClick={handleCrop}
              variant="text"
              style={{ width: 200, color: 'white' }}
            >
              Click Here To Crop
            </Button>
          </div>
          
          <div style={{textAlign:'center', border:'1px solid white', marginTop: 30}}>
            <Typography variant={'p'} color="light" style={{fontSize:14, }}>Scroll To Zoom In, Out</Typography>
          </div>
        </div>
      ) : null}
    
      
      {croppedImage ? (
        <div
          style={{
            width: '100%',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <img
            src={croppedImage}
            style={{ width: 600, height: 600, marginTop: 10 }}
          />
          <div
            style={{
              display:'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: -75,
              width: 600,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Button
              onClick={handleCancel}
              variant="text"
              style={{ width: 200,  color: 'white' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              variant="text"
              style={{ width: 200,color: 'white' }}
            >
              Continue
            </Button>
          </div>

          {/* <Button
            onClick={handleCancel}
            color={'primary'}
            variant="contained"
            style={{ width: 200 }}
          >
            Cancel
          </Button> */}
        </div>
      ) : null}
    </Paper>
  )
}
