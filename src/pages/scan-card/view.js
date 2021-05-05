import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../utils/styles'

import Layout from '../../components/Layout'
import { Grid, Paper, useTheme } from '@material-ui/core'
import Constants, { VColor } from '../../utils/constants'
import CardFrontBack from '../../components/scan-card/CardFrontBack'
import Zoom from '@material-ui/core/Zoom'
import CloseIcon from '@material-ui/icons/Close'

import Utils from '../../utils/utils'
import Fab from '@material-ui/core/Fab'
import EditImg from '../../assets/images/edit.png'
import FilledTextInput from '../../components/scan-card/FilledTextInput'

const cardFields = [
  {
    label: 'Card Program',
    placeholder: 'Card Program Name',
    type: 'text',
  },
  {
    label: 'Card ID',
    placeholder: 'Card ID Number',
    type: 'text',
  },
  {
    label: 'Card Status',
    placeholder: 'Status',
    type: 'text',
  },
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

class ViewCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      showEditButton: true,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  render() {
    const { userData, classes, transitionDuration } = this.props

    return (
      <Layout menuIndex={0}>
        <Container className={classes.cardViewRoot}>
          <Grid container justify="center" spacing={2}>
            <Grid item sm={4} xs={12} className={classes.cardViewGridLeft}>
              <CardFrontBack editMode={!this.state.showEditButton} />
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
              sm={3}
              xs={12}
              className={classes.cardViewGrid}
              style={{ minWidth: 300 }}
            >
              <Paper
                style={{
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
                elevation={0}
              >
                {this.state.showEditButton ? (
                  <>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                      >
                        Next Card
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                      >
                        Print
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                      >
                        Write NFC
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                        onClick={()=>{
                          this.setState({ showEditButton: true})
                        }}
                      >
                        save
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        style={{
                          width: '50%',
                          float: 'right',
                          marginBottom: 20,
                        }}
                        onClick={()=>{
                          this.setState({ showEditButton: true})
                        }}
                      >
                        cancel
                      </Button>
                    </div>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>

          <div
            style={{
              //   position: 'fixed',
              //   bottom: 0,
              width: '100%',
              textAlign: 'center',

              backgroundColor: VColor.white,
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ fontStyle: 'normal' }}
            >
              Powered by Veritec © 2020
            </Typography>
          </div>
          <Zoom
            key={Utils.getKey()}
            in={this.state.showEditButton}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${500}ms`,
            }}
            unmountOnExit
          >
            <Fab
              aria-label={''}
              style={{ position: 'fixed', bottom: 20, right: 30 }}
              color={'primary'}
              onClick={() => {
                this.setState({ showEditButton: !this.state.showEditButton })
              }}
            >
              <img
                src={EditImg}
                style={{ width: 25, objectFit: 'contain', marginTop: 25 }}
              />
            </Fab>
          </Zoom>
        </Container>
      </Layout>
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
  //   const isDesktop = useMediaQuery('(min-width:1030px)')

  return (
    <ViewCard
      {...props}
      dispatch={dispatch}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
