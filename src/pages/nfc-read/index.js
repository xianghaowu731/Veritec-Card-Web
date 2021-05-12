import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import RSSGray from '../../assets/images/rss-gray.png'
import Footer from '../../components/footer/footer'

class NFCRead extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props

    setTimeout(() => {
      // navigate('/nfc-read/view')
    }, 2000)
  }

  onClickNFC = () => {
    navigate('/nfc-read/view')
  }

  render() {
    const { userData, classes } = this.props

    return (
      <MainLayout menuIndex={1}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={this.onClickNFC}
        >
          <img
            draggable={false}
            src={RSSGray}
            style={{ width: 80, height: 80 }}
          ></img>
          <div style={{ textAlign: 'center' }}>
            <span className={classes.mainTitle}>
              Touch an NFC-enabled card to your card reader.
            </span>
          </div>
        </div>
      
      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <NFCRead
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
