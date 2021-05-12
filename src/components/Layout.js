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
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Header from './header/header'

import { VColor } from '../utils/constants'
import Footer from './footer/footer'
import useStyles from '../utils/styles'

export default function Layout({ children, menuIndex }) {
  const classes = useStyles()

  return (
    <ThemeLayout>
      <Header menuIndex={menuIndex} />
      {children}
    </ThemeLayout>
  )
}

export function MainLayout(props) {
  const classes = useStyles()

  
  
  return (
    <Layout menuIndex={props.menuIndex}>
      <Container maxWidth="md" className={classes.cardViewRoot} style={{...props.style,}}>
        <div
          style={{
            minHeight: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingBottom: 30,
            maxWidth: 1500,
            marginLeft:'auto',
            marginRight:'auto'
          }}
        >
          {props.children}
          <Footer />
        </div>
      </Container>
      
      <Backdrop className={classes.backdrop} open={!!props.loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </Layout>
  )
}
