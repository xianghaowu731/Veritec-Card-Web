import React from 'react'

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { VColor } from '../utils/constants'

// const values = {
//   xs: 0,
//   sm: 600,
//   md: 960,
//   lg: 1280,
//   xl: 1920,
//   smx: 599,
//   mdx: 959,
//   lgx: 1279,
//   xlx: 1919,
  
// };


const theme = createMuiTheme({
  // breakpoints: {
  //   keys: ['xs', 'sm', 'md', 'lg', 'xl', 'smx', 'mdx', 'lgx', 'xlx'],
  //   up: (key, index) => index <= 4 ?  `@media (min-width:${values[key]}px)` : `@media (max-width:${values[key]}px)`,
  // },
  
  palette: {
    primary: {
      light: VColor.opacityBlue,
      main: VColor.blue,
      dark: VColor.darkblue,
      contrastText: '#fff',
    },
    secondary: {
      light: '#a7c0cd',
      main: VColor.red,
      dark: '#4b636e',
      contrastText: '#edf0f2',
    },
    third: {
      light: VColor.opacityWhite,
      main: VColor.opacityBlue,
      dark: VColor.darkblue,
      contrastText: '#fff',
    },
  },
})

export default function ThemeLayout(props) {
  const { children } = props

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
