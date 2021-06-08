import React, { useState, useEffect, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropping/cropImage'
import Webcam from 'react-webcam'
import Constants from '../../utils/constants'

export const PhotoPickerStep = {
  Init: 0,
  Camera: 1,
  Cropping: 2,
  Result: 3,
}

const videoConstraints = {
  width: 600,
  height: 600,
}

export const CropType = {
  Face:1,
  CardFront: 2,
  Logo: 3,
}

export default function PhotoPickerDlg({
  title,
  open,
  onUpload,
  cropType = CropType.Face,
  onCamera,
  handleClose,
  onResult,
}) {
  const [curImg, setCurImg] = React.useState()
  const [step, setStep] = React.useState(PhotoPickerStep.Init)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const webcamRef = React.useRef()

  const onFileChange = event => {
    const url = URL.createObjectURL(event.target.files[0])
    setCurImg(url)
    setStep(PhotoPickerStep.Cropping)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
   
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(curImg, croppedAreaPixels)
      setCroppedImage(croppedImage)
      setStep(PhotoPickerStep.Result)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const handleCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setCurImg(imageSrc)
    setStep(PhotoPickerStep.Cropping)

  }, [webcamRef])

  const handleCrop = () => {
    showCroppedImage()
  }

  const handleUpload = () => {
    const filePicker = document.getElementById('file')
    if (filePicker) {
      filePicker.click()
    }

    if (onUpload) {
      onUpload()
    }
  }

  const handleCamera = () => {
    setStep(PhotoPickerStep.Camera)    
  }

  const handleCropCancel = () => {
    setCroppedImage(null)
    setCurImg(null)
    setStep(PhotoPickerStep.Init)
    if (handleClose) {
      handleClose()
    }
  }

  const handleResultDone = () => {
    if (onResult) {
      onResult(croppedImage)
    }
    setStep(PhotoPickerStep.Init)
    setCroppedImage(null)
    setCurImg(null)
  }

  const handleCancelResult = () => {
    if (handleClose) {
      handleClose()
    }
    setStep(PhotoPickerStep.Init)
    setCroppedImage(null)
    setCurImg(null)
  }

  let aspect = cropType == CropType.Face ? 1 : (cropType == CropType.CardFront ? Constants.cardSize.cardRate : 3/1)
  const width = 400;
  let height = width / aspect

  return (
    <Dialog
      open={open}
      onClose={handleCancelResult}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {step == PhotoPickerStep.Init ? (
        <>
          <DialogContent style={{ minWidth: 250 }}>
            <DialogContentText id="alert-dialog-description">
              {title}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px 15px',
            }}
          >
            <Button onClick={handleUpload} color="primary">
              upload
            </Button>
            <Button onClick={handleCamera} color="primary" autoFocus>
              camera
            </Button>
          </DialogActions>
        </>
      ) : null}

      {step == PhotoPickerStep.Camera ? (
        <>
          <DialogContent style={{ minWidth: 250 }}>
            <Webcam
              audio={false}
              height={'100%'}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={'100%'}
              videoConstraints={videoConstraints}
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
            <Button onClick={handleCropCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCapture} color="primary" autoFocus>
              Capture
            </Button>
          </DialogActions>
        </>
      ) : null}
      {step == PhotoPickerStep.Cropping ? (
        <>
          <DialogContent style={{ minWidth: 250 }}>
            <Cropper
              image={curImg}
              crop={crop}
              zoom={zoom}
              style={{
                containerStyle: {
                  position: 'relative',
                  width: width,
                  height: height,
                  marginTop: 20,
                },
              }}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
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
            <Button onClick={handleCropCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCrop} color="primary" autoFocus>
              Crop
            </Button>
          </DialogActions>
        </>
      ) : null}

      {step == PhotoPickerStep.Result ? (
        <>
          <DialogContent style={{ minWidth: 250 }}>
            <div
              style={{
                width: '100%',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <img
                src={croppedImage}
                style={{ width: width, height: height, marginTop: 10 }}
              />
            </div>
          </DialogContent>
          <DialogActions
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px 15px',
            }}
          >
            <Button onClick={handleCancelResult} color="primary">
              Cancel
            </Button>
            <Button onClick={handleResultDone} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </>
      ) : null}

      <input
        type="file"
        name="file"
        id="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={onFileChange}
      />
    </Dialog>
  )
}

export function ConfirmDlg({
  title,
  open = false,
  onOk,
  onCancel,
  okTitle = 'Ok',
  cancelTitle = 'Cancel',
  handleClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
      <DialogContent style={{ minWidth: 250 }}>
        {/* <DialogContentText id="alert-dialog-description"> */}
        {title}
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 15px',
        }}
      >
        {cancelTitle ? (
          <Button onClick={onCancel} color="primary">
            {cancelTitle}
          </Button>
        ) : null}

        {okTitle ? (
          <Button onClick={onOk} color="primary" autoFocus>
            {okTitle}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}
