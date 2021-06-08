import React, { useState } from 'react'
import ThemeLayout from '../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import Header from './header/header'
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
      <Container className={classes.cardViewRoot} style={{...props.style,}}>
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
