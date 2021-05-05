import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import barLogo from '../assets/images/bar-logo.png'
import {
  Paper,
  Button,
  Toolbar,
  IconButton,
  Menu,
  AppBar,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Header from './header/header'

import {VColor } from '../utils/constants'


export default function Layout({ children, menuIndex }) {

 
  return (
    <ThemeLayout>
      <Header menuIndex={menuIndex} />
      {children}
      

      

    </ThemeLayout>
  )
}
