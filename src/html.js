import React from "react"
import PropTypes from "prop-types"
import loaderSVG from './assets/images/loader.svg'
import loaderGIF from './assets/images/loader.gif'
import barLogo from './assets/images/bar-logo.png';
import loaderGif from './assets/images/loader.gif'
import loaderCircle from './assets/images/loader-circle.gif'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`loader`}
          id="___loader"
          style={{
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            display: "flex",
            flexDirection:'column',
            justifyContent: "center",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          
          <div >
           <img 
              alt="" 
              src={barLogo}
              width={250}
            />
          </div>
          
          <div style={{textAlign:'center', marginTop: 30,}}>
            <img alt="" src={loaderCircle} style={{width: 50,}}/>
          </div>
        </div>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}

      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
