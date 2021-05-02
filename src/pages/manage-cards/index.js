import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'


import Typography from '@material-ui/core/Typography'

import useStyles from '../../utils/styles'

import Layout from '../../components/Layout'


class ManageCards extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

 
  render() {
    const { userData, classes } = this.props

    return (
      <Layout menuIndex={3}>
        <Container maxWidth="md" className={classes.rootContainer}>
          
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
    <ManageCards
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
