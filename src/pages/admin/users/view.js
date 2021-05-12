import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../../utils/styles'

import Layout, { MainLayout } from '../../../components/Layout'
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from '@material-ui/core'
import Constants, { VColor } from '../../../utils/constants'
import CardFrontBack from '../../../components/scan-card/CardFrontBack'
import Zoom from '@material-ui/core/Zoom'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Utils from '../../../utils/utils'
import Fab from '@material-ui/core/Fab'
import EditImg from '../../../assets/images/edit.png'
import FilledTextInput from '../../../components/scan-card/FilledTextInput'
import Footer from '../../../components/footer/footer'
import { Add, Delete } from '@material-ui/icons'
import CardProgramsDlg from '../../../components/Dialog/CardProgramsDlg'
import PermissionDlg from '../../../components/Dialog/PermissionDlg'
import AlertDialog from '../../../components/Dialog/AlertDialog'

const cardFields = [
  {
    label: 'First Name',
    placeholder: 'First Name',
    type: 'text',
  },

  {
    label: 'Last Name',
    placeholder: 'Last Name',
    type: 'text',
  },

  {
    label: 'Email',
    placeholder: 'Email Address',
    type: 'email',
  },
]

export class UserView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      showEditButton: true,
      cardPrograms: props.isAdd
        ? []
        : ['Card Type1', 'Card Type2', 'Card Type3'],
      permissions: props.isAdd
        ? []
        : ['Permission 1', 'Permission 2', 'Permission 3', 'Permission 4'],
      openCardPrograms: false,
      openPermissionDlg: false,
      showLoader: false,
      disabledUser: false,
    }

    this.alertRef = React.createRef()
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  handleAddProgram = () => {
    this.setState({
      openCardPrograms: true,
    })
  }

  handleAddPermission = () => {
    this.setState({
      openPermissionDlg: true,
    })
  }

  removeCardPrograms = one => {
    const newList = this.state.cardPrograms.filter(title => {
      return title != one
    })
    this.setState({
      cardPrograms: newList,
    })
  }

  removePermission = one => {
    const newList = this.state.permissions.filter(title => {
      return title != one
    })
    this.setState({
      permissions: newList,
    })
  }

  handleReset = () => {
    this.setState({ showLoader: true })
    setTimeout(() => {
      this.setState({ showLoader: false })
      if (this.alertRef.current) {
        this.alertRef.current.showDialog(
          '',
          'A password reset email has been sent to the selected user.'
        )
      }
    }, 3000)
  }

  onSave = () => {
    if (this.props.isAdd) {
      this.setState({ showLoader: true })
      setTimeout(() => {
        this.setState({ showLoader: false })
        if (this.alertRef.current) {
          this.alertRef.current.showDialog(
            '',
            'User created successfully.',
            () => {
              navigate('/admin/users')
            }
          )
        }
      }, 3000)
    } else {
      this.setState({ showLoader: true })
      setTimeout(() => {
        this.setState({ showLoader: false })
        if (this.alertRef.current) {
          this.alertRef.current.showDialog('', 'Saved user data.', () => {
            navigate('/admin/users')
          })
        }
      }, 3000)
    }
  }

  render() {
    const {
      userData,
      classes,
      transitionDuration,
      isDesktop,
      isAdd,
    } = this.props

    const buttonWidth = isDesktop ? '50%' : 120

    const btnStyle = {
      width: buttonWidth,
      float: 'right',
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20,
      minWidth: 180,
    }

    const rightGridStyle = isDesktop
      ? {
          minWidth: 150,
        }
      : {
          minWidth: '90vw',
        }
    return (
      <MainLayout
        menuIndex={this.props.menuIndex}
        loader={this.state.showLoader}
      >
        <Grid
          container
          justify="center"
          spacing={2}
          style={{ minHeight: '100%' }}
        >
          <Grid
            item
            sm={4}
            xs={12}
            className={classes.cardViewGridLeft}
            style={{
              display:
                this.props.isAdd && this.props.isDesktop ? 'inherit' : 'none',
            }}
          >
            {!this.props.isAdd ? (
              <div style={{ marginTop: 20, paddingLeft: 20 }}>
                <div>
                  <Typography variant="body1">User ID: 0000001</Typography>
                </div>
                <div style={{ marginTop: 5, marginBottom: 5 }}>
                  <Typography variant="body1">Created: 01/01/1970</Typography>
                </div>
                <div>
                  <Typography variant="body1">Status: Enabled</Typography>
                </div>
              </div>
            ) : null}
          </Grid>
          <Grid
            item
            md={5}
            sm={12}
            xs={12}
            className={classes.cardViewGrid}
            style={{ marginRight: 5 }}
          >
            <Paper style={{ padding: '0 10px' }} elevation={0}>
              {cardFields.map((one, index) => {
                return (
                  <FilledTextInput
                    key={Utils.getKey()}
                    label={one.label}
                    type={one.type}
                    placeholder={one.placeholder}
                  />
                )
              })}
            </Paper>
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            className={classes.cardViewGrid}
            style={rightGridStyle}
          >
            <Paper
              style={{
                padding: 10,
                display: 'flex',
                width: '100%',

                flexDirection: isDesktop ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: isDesktop ? 'stretch' : 'center',
                flexWrap: isDesktop ? 'nowrap' : 'wrap',
              }}
              elevation={0}
            >
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  style={btnStyle}
                  onClick={this.onSave}
                >
                  Save
                </Button>
              </div>

              {this.props.isAdd ? null : (
                <>
                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={btnStyle}
                      onClick={this.handleReset}
                    >
                      Reset password
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      color={this.state.disabledUser ? 'primary' : 'secondary'}
                      style={btnStyle}
                      onClick={() => {
                        this.setState({
                          disabledUser: !this.state.disabledUser,
                        })
                      }}
                    >
                      {this.state.disabledUser ? 'Enable User' : 'Disable User'}
                    </Button>
                  </div>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
        <CardProgramsDlg
          open={this.state.openCardPrograms}
          selPrograms={this.state.cardPrograms}
          onCancel={() => {
            this.setState({ openCardPrograms: false })
          }}
          onAdd={selList => {
            this.setState({
              cardPrograms: selList,
              openCardPrograms: false,
            })
          }}
          handleClose={() => {
            this.setState({ openCardPrograms: false })
          }}
        />

        <PermissionDlg
          open={this.state.openPermissionDlg}
          selPrograms={this.state.permissions}
          onCancel={() => {
            this.setState({ openPermissionDlg: false })
          }}
          onAdd={selList => {
            this.setState({
              permissions: selList,
              openPermissionDlg: false,
            })
          }}
          handleClose={() => {
            this.setState({ openPermissionDlg: false })
          }}
        />

        <AlertDialog ref={this.alertRef} okTitle={'done'} />
      </MainLayout>
    )
  }
}

export default function(props) {
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
      menuIndex={5}
      isAdd={false}
      dispatch={dispatch}
      isDesktop={isDesktop}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
