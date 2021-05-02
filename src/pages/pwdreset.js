import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import barLogo from '../assets/images/bar-logo.png'
import { Paper, Button } from '@material-ui/core'


import Typography from '@material-ui/core/Typography'
import {pwdResetStyles} from '../utils/styles'

class PwdReset extends React.Component {
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
      <ThemeLayout>
        <Container maxWidth="md" className={classes.rootContainer}>
          <Paper className={classes.paper} elevation={3}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img alt="" src={barLogo} width={250} />
            </div>

            <div style={{ padding: '0 30px', marginTop: 40 }}>
              <Typography variant="h6" gutterBottom>
                Password Reset
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ marginBottom: 60 }}
              >
                Your password has been reset. Check your email to retrieve your
                temporary password. Having trouble? Be sure to check your spam
                folder and mail filters.
              </Typography>
              <form className={classes.formRoot} autoComplete="off">
                <div>
                  <Link to="/dashboard" replace>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.signin}
                    >
                      complete
                    </Button>
                  </Link>
                </div>
              </form>
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
      </ThemeLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = pwdResetStyles()

  return (
    <PwdReset
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
