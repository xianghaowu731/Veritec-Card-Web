import React from 'react'

import { connect, useDispatch, useSelector } from 'react-redux'
import useStyles from '../../../utils/styles'

import { useTheme } from '@material-ui/core'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import {ViewCardProgram} from './view'

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  // const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isDesktop = useMediaQuery('(min-width:1053px)')

  return (
    <ViewCardProgram
      {...props}
      menuIndex={5}
      dispatch={dispatch}
      isDesktop={isDesktop}
      isCreateMode={true}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
