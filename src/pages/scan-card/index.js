import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import WebCamView from '../../components/scan-card/WebCamView'
import Footer from '../../components/footer/footer'
import { Grid } from '@material-ui/core'

class ScanCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props

    setTimeout(() => {
      // navigate('/scan-card/view')
    }, 2000)
  }

  onTap = ()=>{
      navigate('/scan-card/view')

  }

  render() {
    const { userData, classes } = this.props

    return (
      <MainLayout menuIndex={0}>
        <WebCamView onClick={this.onTap}/>
     
      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <ScanCard
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
