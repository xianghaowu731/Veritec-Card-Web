import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  useTheme,
} from '@material-ui/core'
import Constants, { VColor } from '../../utils/constants'
import CardFrontBack from '../../components/scan-card/CardFrontBack'
import Zoom from '@material-ui/core/Zoom'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Utils from '../../utils/utils'
import Fab from '@material-ui/core/Fab'
import EditImg from '../../assets/images/edit.png'
import FilledTextInput from '../../components/scan-card/FilledTextInput'
import CardFrontPhoto from '../../components/OrderCard/CardFrontPhoto'
import { AlertDlg } from '../../components/Dialog/AlertDialog'
import { ConfirmDlg } from '../../components/Dialog/PhotoPickerDlg'
import Footer from '../../components/footer/footer'

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
    label: 'Address 1',
    placeholder: 'Address Line 1',
    type: 'text',
  },
  {
    label: 'Address 2',
    placeholder: 'Address Line 2',
    type: 'text',
  },
  {
    label: 'City',
    placeholder: 'City',
    type: 'text',
  },
  {
    label: 'State',
    placeholder: 'State',
    type: 'text',
  },
  {
    label: 'Zip Code',
    placeholder: 'Zip Code',
    type: 'text',
  },
  {
    label: 'Email',
    placeholder: 'Email Address',
    type: 'email',
  },
  {
    label: 'Phone Number',
    placeholder: '(555) 555-5555',
    type: 'phone',
  },
]

export class OrderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      showEditButton: true,
      openOrderConfirm: false,
      resultTitle: '',
      openResultDlg: false,
      loader: false,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onSave = () => {
    this.setState({
      openOrderConfirm: true,
    })
  }

  onConfirmOrder = () => {
    this.setState({ loader: true, openOrderConfirm: false })

    setTimeout(() => {
      this.setState({
        resultTitle: 'Your card has been ordered',
        openResultDlg: true,
        loader: false,
      })
    }, 3000)
  }

  render() {
    const {
      userData,
      classes,
      transitionDuration,
      isDesktop,
      selOrderCardFront,
    } = this.props

    const buttonWidth = isDesktop ? '50%' : 120

    const btnStyle = {
      width: buttonWidth,
      float: 'right',
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20,
      minWidth: 120,
    }

    const rightGridStyle = isDesktop
      ? {
          minWidth: 150,
        }
      : {
          minWidth: '90vw',
        }

    return (
      <MainLayout menuIndex={2}>
        <Grid container justify="center" spacing={2}>
          <Grid item sm={4} xs={12} className={classes.cardViewGridLeft}>
            <CardFrontPhoto cardFrontImage={selOrderCardFront} />
          </Grid>
          <Grid
            item
            sm={5}
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
                // minWidth: isDesktop ? 300 :  600,
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
                  save
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>


        <ConfirmDlg
          title="You are about to order a card, Are you sure you want to do this?"
          open={this.state.openOrderConfirm}
          okTitle="Order"
          onOk={this.onConfirmOrder}
          onCancel={() => {
            this.setState({ openOrderConfirm: false })
          }}
        />

        <ConfirmDlg
          title={this.state.resultTitle}
          open={this.state.openResultDlg}
          okTitle="DONE"
          cancel=""
          onOk={() => {
            this.setState({ openResultDlg: false })
          }}
          onCancel={() => {
            this.setState({ openResultDlg: false })
          }}
        />

        <Backdrop
          className={classes.backdrop}
          open={this.state.loader}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  const selOrderCardFront = useSelector(state => state.app.selOrderCardFront)

  const theme = useTheme()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  // const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isDesktop = useMediaQuery('(min-width:1053px)')

  return (
    <OrderCard
      {...props}
      selOrderCardFront={selOrderCardFront}
      menuIndex={2}
      dispatch={dispatch}
      isDesktop={isDesktop}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
