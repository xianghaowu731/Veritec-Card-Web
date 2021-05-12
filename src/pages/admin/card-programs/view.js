import React from 'react'
import { Link, navigate } from 'gatsby'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from '../../../utils/styles'

import { MainLayout } from '../../../components/Layout'
import { Grid, Paper, useTheme } from '@material-ui/core'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Utils from '../../../utils/utils'

import FilledTextInput from '../../../components/scan-card/FilledTextInput'
import CardProgramsLeft from '../../../components/scan-card/CardProgramsLeft'
import { ConfirmDlg } from '../../../components/Dialog/PhotoPickerDlg'
import AddFieldDlg from '../../../components/Dialog/AddFieldDlg'

const requiredCardFields = [
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
  {
    label: 'Address 1',
    placeholder: 'Address Line 1',
    type: 'text',
    removable: true,
  },
  {
    label: 'Address 2',
    placeholder: 'Address Line 2',
    type: 'text',
    removable: true,
  },
  {
    label: 'City',
    placeholder: 'City',
    type: 'text',
    removable: true,
  },
  {
    label: 'State',
    placeholder: 'State',
    type: 'text',
    removable: true,
  },
  {
    label: 'Zip Code',
    placeholder: 'Zip Code',
    type: 'text',
    removable: true,
  },

  {
    label: 'Phone Number',
    placeholder: '(555) 555-5555',
    type: 'phone',
    removable: true,
  },
]

export class ViewCardProgram extends React.Component {
  constructor(props) {
    super(props)
    const { isCreateMode } = props
    this.state = {
      isLogin: true,
      editMode: false,
      disabledProgram: false,
      cardFields: isCreateMode ? requiredCardFields : cardFields,
      serverFields: isCreateMode
        ? []
        : [
            {
              label: 'Label 1',
              placeholder: 'Label 1',
              type: 'text',
              removable: true,
            },
            {
              label: 'Label 2',
              placeholder: 'Label 2',
              type: 'text',
              removable: true,
            },
          ],
      openServerFieldsAdd: false,
      openCardFieldsAdd: false,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onConfirm = () => {
    this.setState({ disabledProgram: true, openDiableConfirm: false })
  }

  onDeleteCardFields = label => {
    const newCardFields = this.state.cardFields.filter(one => {
      return one.label != label
    })
    this.setState({
      cardFields: newCardFields,
    })
  }

  onDeleteServerFields = label => {
    const newList = this.state.serverFields.filter(one => {
      return one.label != label
    })
    this.setState({
      serverFields: newList,
    })
  }

  render() {
    const {
      userData,
      classes,
      transitionDuration,
      isDesktop,
      isCreateMode,
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
      <MainLayout menuIndex={this.props.menuIndex}>
        <Grid
          container
          justify="center"
          spacing={2}
          style={{ minHeight: '100%' }}
        >
          <Grid item sm={4} xs={12} className={classes.cardViewGridLeft}>
            <CardProgramsLeft
              isCreateMode = {isCreateMode}
              editMode={this.state.editMode || isCreateMode}
              disabledProgram={this.state.disabledProgram || isCreateMode}
            />
          </Grid>
          <Grid
            item
            sm={5}
            xs={12}
            className={classes.cardViewGrid}
            style={{ marginRight: 5 }}
          >
            <Paper
              style={{ padding: '0 10px', marginBottom: 20 }}
              elevation={0}
            >
              <div>
                <Typography variant="h3" style={{ fontWeight: 'lighter' }}>
                  Card Fields
                </Typography>
              </div>
              <div style={{ marginTop: 10 }}>
                <Typography variant="body1">
                  Card fields are written to the barcode and NFC on a card. It
                  is recommended that only essential fields are written to
                  cards. Additional fields can be accessed from the server.
                </Typography>
              </div>
            </Paper>
            <Paper style={{ padding: '0 10px' }} elevation={0}>
              {this.state.editMode || isCreateMode ? (
                <Button
                  size="medium"
                  variant={'contained'}
                  color={'primary'}
                  style={{ marginBottom: 10 }}
                  onClick={() => {
                    this.setState({
                      openCardFieldsAdd: true,
                    })
                  }}
                >
                  Add Field
                </Button>
              ) : null}
              {this.state.cardFields
                ? this.state.cardFields.map((one, index) => {
                    return (
                      <FilledTextInput
                        key={Utils.getKey()}
                        label={one.label}
                        type={one.type}
                        placeholder={one.placeholder}
                        removable={one.removable}
                        editMode={this.state.editMode || isCreateMode} 
                        onDelete={() => {
                          const label = one.label
                          this.onDeleteCardFields(label)
                        }}
                      />
                    )
                  })
                : null}
            </Paper>
            <Paper
              style={{ padding: '0 10px', marginBottom: 20 }}
              elevation={0}
            >
              <div>
                <Typography variant="h3" style={{ fontWeight: 'lighter' }}>
                  Server Fields
                </Typography>
              </div>
              <div style={{ marginTop: 10 }}>
                <Typography variant="body1">
                  Server fields contain additional information that is not
                  stored in the code and NFC of a card. When a card is scanned
                  the application will reach out to the server to retrieve this
                  information. It is recommended that server fields are used for
                  information that is expected to change.
                </Typography>
              </div>
            </Paper>
            <Paper style={{ padding: '0 10px' }} elevation={0}>
              {this.state.editMode || isCreateMode ? (
                <Button
                  size="medium"
                  variant={'contained'}
                  color={'primary'}
                  style={{ marginBottom: 10 }}
                  onClick={() => {
                    this.setState({
                      openServerFieldsAdd: true,
                    })
                  }}
                >
                  Add Field
                </Button>
              ) : null}

              {this.state.serverFields
                ? this.state.serverFields.map((one, index) => {
                    return (
                      <FilledTextInput
                        key={Utils.getKey()}
                        label={one.label}
                        type={one.type}
                        placeholder={one.placeholder}
                        removable={one.removable}
                        editMode={this.state.editMode || isCreateMode}
                        onDelete={() => {
                          const label = one.label
                          this.onDeleteServerFields(label)
                        }}
                      />
                    )
                  })
                : null}
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
              {this.state.editMode || isCreateMode ? (
                <div>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    style={btnStyle}
                    onClick={() => {
                      if (isCreateMode) {
                        navigate('/admin/card-programs/')
                      } else {
                        this.setState({ editMode: false })
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : !this.state.editMode && this.state.disabledProgram ? (
                <>
                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={btnStyle}
                      onClick={() => {
                        this.setState({ disabledProgram: false })
                      }}
                    >
                      Enable
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      style={btnStyle}
                      onClick={() => {
                        this.setState({ editMode: true })
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    style={btnStyle}
                    onClick={() => {
                      this.setState({ openDiableConfirm: true })
                    }}
                  >
                    Disable
                  </Button>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>

        <ConfirmDlg
          title={
            <>
              <div>
                <Typography>Warning! This is probably a bad idea.</Typography>
              </div>
              <div>
                <Typography>
                  Disabling a card program will take the entire program offline.
                  Card program users will not be able to log in to mobile apps
                  or the website. You should only disable a card program during
                  a scheduled maintenance or when a program is terminated.
                </Typography>
              </div>
            </>
          }
          open={this.state.openDiableConfirm}
          okTitle="Confirm"
          cancelTitle="Cancel"
          onOk={this.onConfirm}
          onCancel={() => {
            this.setState({ openDiableConfirm: false })
          }}
        />

        <AddFieldDlg
          open={this.state.openServerFieldsAdd}
          onAdd={(label, type) => {
            const newList = [
              ...this.state.serverFields,
              {
                label: label,
                placeholder: label,
                type: type,
                removable: true,
              },
            ]
            this.setState({ serverFields: newList, openServerFieldsAdd: false })
          }}
          onCancel={() => {
            this.setState({ openServerFieldsAdd: false })
          }}
          handleClose={() => {
            this.setState({ openServerFieldsAdd: false })
          }}
        />

        <AddFieldDlg
          open={this.state.openCardFieldsAdd}
          onAdd={(label, type) => {
            const newList = [
              ...this.state.cardFields,
              {
                label: label,
                placeholder: label,
                type: type,
                removable: true,
              },
            ]
            this.setState({ cardFields: newList, openCardFieldsAdd: false })
          }}
          onCancel={() => {
            this.setState({ openCardFieldsAdd: false })
          }}
          handleClose={() => {
            this.setState({ openCardFieldsAdd: false })
          }}
        />
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
    <ViewCardProgram
      {...props}
      menuIndex={5}
      dispatch={dispatch}
      isDesktop={isDesktop}
      //   userData={userData}
      classes={classes}
      transitionDuration={transitionDuration}
    />
  )
}
