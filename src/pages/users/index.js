import 'date-fns'
import React from 'react'
import { Link, navigate } from 'gatsby'
import ThemeLayout from '../../components/ThemeLayout'
import Container from '@material-ui/core/Container'

import { connect, useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import useStyles from '../../utils/styles'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Layout, { MainLayout } from '../../components/Layout'
import { VColor } from '../../utils/constants'
import { Grid } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Footer from '../../components/footer/footer'

import { useDemoData } from '@material-ui/x-grid-data-generator'
import ProgressDlg from '../../components/Dialog/ProgressDlg'
import { setSelCard } from '../../state/actions'
import Utils from '../../utils/utils'

const columns = [
  
  { field: 'status', headerName: 'Status', width: 140 },
  { field: 'date', headerName: 'Date', width: 140 },
  { field: 'fname', headerName: 'Status', width: 140 },
  { field: 'lname', headerName: 'Status', width: 140 },  
  { field: 'id', headerName: 'ID', width: 140, hide: true },
]

const fakeRow = {
  status: 'Status 1',
  date: '12/2/2323',
  fname: 'Aalksdjnc',
  lname: 'cvsasdc',  
  id: '283401623987',
}

function loadServerRows({ page, rowsPerPage = 5, data }) {
  return new Promise(resolve => {
    setTimeout(() => {
      const rows = data.rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      const fakeRows = rows.map(one => ({
        ...fakeRow,
        id: Utils.getKey().toUpperCase(),
      }))
      resolve(fakeRows)
    }, Math.random() * 500 + 100) // simulate network latency
  })
}

export function UsersDT({}) {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 8,
  })
  const dispatch = useDispatch()

  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState([])
  const [pageSize, setPageSize] = React.useState(10)

  const [loading, setLoading] = React.useState(false)

  const handlePageChange = params => {
    setPage(params.page)
  }

  React.useEffect(() => {
    let active = true

    ;(async () => {
      setLoading(true)
      const newRows = await loadServerRows({
        page,
        data,
        rowsPerPage: pageSize,
      })

      if (!active) {
        return
      }
      console.log('data.columns: ', data.columns)
      console.log('newRows : ', newRows)

      setRows(newRows)
      setLoading(false)
    })()

    return () => {
      active = false
    }
  }, [page, data, pageSize])

  const gotoUserView = data => {
    
    navigate('/users/view')
  }

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={({ page, pageCount, pageSize, rowCount }) => {
          setPageSize(pageSize)
        }}
        rowCount={100}
        checkboxSelection
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
        // onRowClick={(data, event)=>{
        //   console.log(data.row)
        // }}
        onCellClick={(data, event) => {
          console.log('cellData : ', data.row)
          gotoUserView(data.row)
        }}
      />
    </div>
  )
}

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      status: '',
      email:'',
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onNewUser = ()=>{
    navigate('/users/create')
  }

  onTapSearch = ()=>{

  }

  render() {
    const { userData, classes } = this.props

    return (
        <MainLayout menuIndex={4}>
          <Grid
            container
            spacing={3}
            style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Grid item sm={6}>
              <div
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  background: VColor.lightGray,
                  maxWidth: 300,
                }}
              >
                <FormControl style={{ width: '100%' }}>
                  <InputLabel htmlFor="filled-basic">Email Address</InputLabel>
                  <Input
                    id="filled-basic"
                    type={'email'}
                    value={this.state.email}
                    variant="filled"
                    onChange={e => {
                      this.setState({ email: e.target.value })
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.onTapSearch}
                          onMouseDown={this.onTapSearch}
                        >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item sm={4} xs={false}></Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  labelId="select-status"
                  id="select-status"
                  value={this.state.status}
                  fullWidth
                  onChange={e => {
                    this.setState({ status: e.target.value })
                  }}
                >
                  <MenuItem value={1}>Enabled</MenuItem>
                  <MenuItem value={2}>Locked</MenuItem>
                  <MenuItem value={3}>Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <UsersDT />
            </Grid>
            <Grid item md={2} sm={3} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                fullWidth
                onClick={this.onNewUser}
              >
                New User
              </Button>
            </Grid>
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
    <Users
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
