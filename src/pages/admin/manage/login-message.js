import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import barLogo from '../../../assets/images/bar-logo.png'
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
import TextField from '@material-ui/core/TextField'

import useStyles from '../../../utils/styles'

import Layout, { MainLayout } from '../../../components/Layout'
import { VColor } from '../../../utils/constants'

class LoginMessage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      message: `  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
      in commodo diam. In tincidunt odio non massa elementum
      ultrices. Sed finibus porttitor arcu, nec eleifend arcu
      sodales quis. In convallis leo eget venenatis faucibus. Etiam
      tincidunt orci a urna consectetur, at bibendum risus accumsan.
      Etiam pharetra, orci non fringilla venenatis, nisi lacus
      porttitor sem, id aliquam nulla diam sed ligula. Mauris varius
      congue auctor. Nulla facilisi. Aliquam justo mauris, commodo
      et ultricies eu, auctor eget nulla. Duis aliquam tellus nec
      nisl mattis, at accumsan orci pharetra. Vivamus iaculis
      pulvinar ultricies. Mauris condimentum tellus pulvinar,
      tristique ligula accumsan, lobortis nisi. Proin cursus purus
      vel vestibulum efficitur. Nullam tempus feugiat orci sit amet
      dictum. Aenean posuere eu libero posuere malesuada. Aliquam
      vel erat massa. Suspendisse potenti. Nullam bibendum ante
      placerat ipsum blandit egestas. Cras finibus posuere ligula,
      vel molestie felis vulputate et. Fusce vel accumsan nulla.
      Aenean tortor velit, elementum sit amet fringilla tempor,
      faucibus id nibh. Mauris laoreet dui eget turpis mollis, vitae
      varius nulla cursus. Suspendisse dignissim ligula sed semper
      consectetur. Ut eget neque quis elit ultrices vulputate id ac
      odio. Nullam ullamcorper nulla sodales, placerat sem a, rutrum
      nulla. Donec vel faucibus ex. Aliquam congue massa nisl, et
      aliquam nisl malesuada nec. Ut vel egestas nisi, sit amet
      aliquet enim. Aenean ut faucibus tortor. Curabitur cursus sem
      vel fringilla posuere. Aenean eros risus, pretium non aliquam
      vitae, consequat at magna. Cras porttitor diam et porta
      lacinia. Maecenas aliquam fermentum sapien, eget ornare nisi
      fringilla nec. Vestibulum fringilla, mauris non suscipit
      fermentum, metus magna tincidunt eros, ut feugiat urna sapien
      faucibus orci. Phasellus blandit turpis sed ultrices
      hendrerit. Nunc rutrum mauris non sem viverra consequat.
      Mauris eget enim in nunc tincidunt bibendum. In gravida
      euismod nisl in suscipit. Nunc neque risus, euismod viverra
      nunc vitae, dictum tempor tortor. Fusce mollis sem in
      facilisis elementum. Curabitur lacinia, mauris placerat porta
      elementum, sapien mi maximus est, finibus tempor enim dolor id
      turpis. Donec ligula erat, varius dapibus dolor sit amet,
      pharetra condimentum mauris. Sed tempus non tellus eu
      venenatis. Nunc vestibulum metus ipsum, ut pellentesque mauris
      maximus ac. Ut gravida pulvinar dignissim. Suspendisse
      ullamcorper sapien sed neque auctor, sit amet egestas augue
      sodales. Sed fringilla purus eu ante lobortis tempor. Sed
      feugiat elementum leo, vel dignissim urna tempus quis. Morbi
      commodo euismod odio in auctor. Vivamus hendrerit laoreet
      lectus non accumsan. Praesent vitae risus in massa laoreet
      consequat ac vitae tortor. Aenean ligula libero, varius sit
      amet convallis id, convallis at nisl. Integer at dapibus arcu,
      ac congue justo. Duis odio leo, tristique eu velit nec, auctor
      molestie mi.`,
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
      <MainLayout menuIndex={5}>
        <Container maxWidth="sm">
          <Paper elevation={0}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h5" style={{ fontWeight: 'lighter' }}>
                Login Message
              </Typography>
            </div>
            <div style={{ marginTop: 20 }}>
              <TextField
                id="outlined-multiline-static"
                label=""
                multiline
                fullWidth
                rows={20}
                //   defaultValue={this.state.message}
                variant="outlined"
                value={this.state.message}
                onChange={e => {
                  this.setState({ message: e.target.value })
                }}
                style={{height: '50%', minHeight: 400}}
              />

              <div style={{ marginTop: 30 }}>
                <Link to="/admin">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: 'right', textTransform: 'none' }}
                  >
                    Save
                  </Button>
                </Link>
              </div>
            </div>
          </Paper>
       
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
    <LoginMessage
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
