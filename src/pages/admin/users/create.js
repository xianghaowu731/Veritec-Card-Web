import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../../utils/styles'

import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from '@material-ui/core'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import {UserView} from './view'


export default function AdminUserCreate(props) {
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
    <UserView
      {...props}
      menuIndex={5}
      isAdd={true}
      dispatch={dispatch}
      isDesktop={isDesktop}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
