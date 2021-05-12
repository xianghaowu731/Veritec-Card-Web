import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import { Button, Grid } from '@material-ui/core'
import AlertDialog from '../../components/Dialog/AlertDialog'

class ChangePwd extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      showLoader: false,
    }

    this.alertRef = React.createRef()
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onSave = () => {
    this.setState({ showLoader: true })
    setTimeout(() => {
      this.setState({ showLoader: false })
      
      if (this.alertRef) {
        this.alertRef.current.showDialog(
          '',
          'Your password has been reset',
          () => {
            navigate('/')
          }
        )
      }
    }, 2000)
  }

  render() {
    const { userData, classes } = this.props

    return (
      <MainLayout menuIndex={6} loader={this.state.showLoader}>
        <Container maxWidth="sm">
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                required
                id="filled-required"
                label="Current Password"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                required
                id="filled-required"
                label="New Password"
                type="password"
                // defaultValue="Hello World"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                required
                id="filled-required"
                label="Confirm New Password"
                type="password"
                // defaultValue="Hello World"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                style={{ float: 'right' }}
                onClick={this.onSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
        <AlertDialog ref={this.alertRef} okTitle={'Continue'} />
      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <ChangePwd
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
