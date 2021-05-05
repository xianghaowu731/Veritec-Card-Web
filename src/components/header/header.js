import React from 'react'
import { Link, navigate } from 'gatsby'

import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Button,
  Toolbar,
  IconButton,
  Menu,
  AppBar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import logoTrans from '../../assets/icon-trans.png'
import useStyles from '../../utils/styles'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { VColor } from '../../utils/constants'

const menuItems = [
  { label: 'SCAN CARD', link: '/scan-card' },
  { label: 'NFC READ', link: '/nfc-read' },
  { label: 'ORDER CARD', link: '/order-card' },
  { label: 'MANAGE CARDS', link: '/manage-cards' },
  { label: 'USERS', link: '/users' },
  { label: 'ADMIN', link: '/admin' },
  { label: 'CHANGE PASSWORD', link: '/change-password' },
]

const Header = ({ menuIndex }) => {
  const classes = useStyles()
  const theme = useTheme()
  // const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isDesktop = useMediaQuery('(min-width:1030px)')

  const [openDrawer, setOpenDrawer] = React.useState(false)

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }

  const list = () => (
    <div
      className={classes.menuList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <Link to={item.link}>
            <ListItem
              button
              key={item.label}
              style={{ marginTop: 6, backgroundColor: menuIndex == index ? VColor.opacityBlue : VColor.white }}
            >
              <ListItemText primary={item.label}/>             
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['SIGN OUT'].map((text, index) => (
          <Link to={'/'}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Toolbar className={classes.tollbar}>
        <img src={logoTrans} style={{ width: 32, height: 32, margin: 0 }} />
        <Typography
          variant="body"
          style={{ marginLeft: 10, fontSize: 24, fontWeight: '200' }}
        >
          Veritec
        </Typography>
        {isDesktop ? (
          <>
            <div style={{ margin: '8px 0 0 20px' }}>
              {menuItems.map((one, index) => {
                return (
                  <Link to={one.link}>
                    <Button  style={{ position: 'relative', color: VColor.opacityBlue }}>
                      {one.label}
                      {index == menuIndex ? (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            bottom: -5,
                            width: '100%',
                            height: 3,
                            backgroundColor: 'white',
                          }}
                        ></div>
                      ) : null}
                    </Button>
                  </Link>
                )
              })}
            </div>
            <div className={classes.grow} />
            <div style={{ margin: '8px 0 0 20px' }}>
              <Link to={'/'} replace>
                <Button style={{color: VColor.opacityBlue}}>sign out</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={classes.grow} />
            <IconButton
              edge="start"
              // className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        {list('right')}
      </Drawer>
    </AppBar>
  )
}

export default Header
