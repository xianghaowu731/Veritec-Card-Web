import React from 'react'
import { Link, navigate } from 'gatsby'
import { connect, useDispatch, useSelector } from 'react-redux'

import {
  Paper,
} from '@material-ui/core'
import Webcam from 'react-webcam'
import { VColor } from '../../utils/constants'

const videoConstraints = {
    width: 600,
    height: 480,
    facingMode: 'user',
  }

export default function WebCamView (props){

   const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
    }, [webcamRef])

    const webcamRef = React.useRef()
      
    return (
        <Paper elevation={0} style={{width:'80%', maxHeight:'80%'}} onClick={()=>{navigate('view')}}>
        <div style={{ marginTop: 40, position: 'relative' }}>
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
              left:0,
              
              width: '100%',
              height: '30%',
              backgroundColor:VColor.opacityBlack,
              zIndex:1000
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '70%',
              left:0,                  
              width: '100%',
              height: '28%',
              backgroundColor:VColor.opacityBlack,
              zIndex:1001
            }}
          ></div>
           <div
            style={{
              position: 'absolute',
              top: '30%',
              left:0,
              
              width: '30%',
              height: '40%',
              backgroundColor:VColor.opacityBlack,
              zIndex:1000
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left:'70%',
              
              width: '30%',
              height: '40%',
              backgroundColor:VColor.opacityBlack,
              zIndex:1000
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left:'30%',
              border: '1px solid green',
              width: '40%',
              height: '40%',
              zIndex:1000
            }}
          ></div>
        </div>
      </Paper>
    )
}