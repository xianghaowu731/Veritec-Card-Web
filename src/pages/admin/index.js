import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import { Button, ButtonBase, Grid, Typography } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'

const AdminMenuItem = ({ title, link }) => {
  return (
    <Link to={link}>
      <ButtonBase
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography color={'textPrimary'}>{title}</Typography>
        </div>
        <div style={{ marginTop: 5 }}>
          <ChevronRight color="action"/>
        </div>
      </ButtonBase>
    </Link>
  )
}

class Admin extends React.Component {
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
      <MainLayout menuIndex={5}>
        <Container maxWidth="xs">
          <Grid
            container
            spacing={3}
            style={{ marginTop: 20, textAlign: 'left' }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AdminMenuItem link="/admin/users" title="Manage Admin Users" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AdminMenuItem link="/admin/card-programs" title="Manage Card Programs" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AdminMenuItem link="/admin/login-message" title="Manage Login Message" />
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <Admin
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
