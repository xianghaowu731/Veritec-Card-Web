import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import useStyles from '../../utils/styles'

import Layout, { MainLayout } from '../../components/Layout'
import { ButtonBase, Grid, Paper } from '@material-ui/core'

import cardFront from '../../assets/images/card-front.png'
import card1 from '../../assets/images/card1.png'
import card2 from '../../assets/images/card2.png'
import card3 from '../../assets/images/card3.png'
import card4 from '../../assets/images/card4.png'
import card5 from '../../assets/images/card5.png'
import Utils from '../../utils/utils'
import { setSelOrderCardFront } from '../../state/actions'
import Footer from '../../components/footer/footer'

const cards = [cardFront, card1, card2, card3, card4, card5]

class OrderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onTapCard = cardFrontImg => {
    const { dispatch, userData, basicData } = this.props

    dispatch(setSelOrderCardFront(cardFrontImg))
    navigate('/order-card/order')
  }

  render() {
    const { userData, classes } = this.props

    return (
      <MainLayout menuIndex={2}>
        <Grid
          container
          justify="center"
          alignItems={'flex-start'}
          spacing={6}
          style={{ padding: 20, maxWidth: 1200 }}
        >
          {cards.map(one => {
            return (
              <Grid
                key={Utils.getKey()}
                item
                lg={4}
                md={4}
                sm={6}
                xs={12}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Paper elevation={4}>
                  <ButtonBase onClick={() => this.onTapCard(one)}>
                    <img
                      src={one}
                      style={{
                        objectFit: 'contain',
                        borderRadius: 7,
                        marginBottom: 0,
                      }}
                    />
                  </ButtonBase>
                </Paper>
              </Grid>
            )
          })}
        </Grid>

      </MainLayout>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <OrderCard
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
