import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from '@material-ui/core'
import Constants, { VColor } from '../../utils/constants'
import CardFrontBack from '../../components/scan-card/CardFrontBack'
import Zoom from '@material-ui/core/Zoom'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Utils from '../../utils/utils'
import Fab from '@material-ui/core/Fab'
import EditImg from '../../assets/images/edit.png'
import FilledTextInput from '../../components/scan-card/FilledTextInput'
import Footer from '../../components/footer/footer'
import { Add, Delete } from '@material-ui/icons'
import CardProgramsDlg from '../../components/Dialog/CardProgramsDlg'
import PermissionDlg from '../../components/Dialog/PermissionDlg'
import AlertDialog from '../../components/Dialog/AlertDialog'
import {UserView} from './view'

export default function UserCreate(props) {
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
      menuIndex={4}
      isAdd={true}
      dispatch={dispatch}
      isDesktop={isDesktop}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
