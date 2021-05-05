import React, { useState } from 'react'
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

import Utils from '../../utils/utils'

export default function FilledTextInput({ label, type, placeholder }) {

    const [focused, setFocused] = useState(false)

  const classes = useStyles()

  return (
    <div      
      style={{
        backgroundColor: VColor.lightGray,
        padding: 5,
        marginBottom: 20,
      }}
    >
      <div className={classes.labelText} style={{ marginLeft: 3 }}>
        {label}
      </div>
      <input
        className={classes.mainText}
        type={type}
        placeholder={placeholder}
        onFocus={()=>{
            setFocused(true)
        }}
        onBlur={()=>{
            setFocused(false)
        }}
        style={{
          width: '100%',
          borderWidth: 0,
          backgroundColor: VColor.lightGray,
          outline: 'none',
          borderBottomWidth: focused ? 2 : 0,
          borderBottomColor: VColor.blue
        }}
      />
    </div>
  )
}
