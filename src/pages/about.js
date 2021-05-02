import React from 'react'
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
import logoTrans from '../assets/icon-trans.png'
import useStyles from '../utils/styles'

import Layout from '../components/Layout'

class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      email: '',
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onSignup = () => {}

  onSignin = () => {}

  handleChange = event => {
    this.setState({ email: event.target.value })
  }

  render() {
    const { userData, classes } = this.props

    return (
      <Layout>
        <Container maxWidth="md" className={classes.rootContainer}>
          <Paper elevation={0}>
            <div style={{ marginTop: 40 }}>
              <div className={classes.aboutTermScrollRoot}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(one => {
                  return (
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ marginBottom: 20 }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras in commodo diam. In tincidunt odio non massa
                      elementum ultrices. Sed finibus porttitor arcu, nec
                      eleifend arcu sodales quis. In convallis leo eget
                      venenatis faucibus. Etiam tincidunt orci a urna
                      consectetur, at bibendum risus accumsan. Etiam pharetra,
                      orci non fringilla venenatis, nisi lacus porttitor sem, id
                      aliquam nulla diam sed ligula. Mauris varius congue
                      auctor. Nulla facilisi. Aliquam justo mauris, commodo et
                      ultricies eu, auctor eget nulla. Duis aliquam tellus nec
                      nisl mattis, at accumsan orci pharetra. Vivamus iaculis
                      pulvinar ultricies. Mauris condimentum tellus pulvinar,
                      tristique ligula accumsan, lobortis nisi. Proin cursus
                      purus vel vestibulum efficitur. Nullam tempus feugiat orci
                      sit amet dictum.
                    </Typography>
                  )
                })}
              </div>
              
            </div>
          </Paper>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ position: 'absolute', bottom: 10, fontStyle: 'normal' }}
          >
            Powered by Veritec © 2020
          </Typography>
        </Container>
      </Layout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <About
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
