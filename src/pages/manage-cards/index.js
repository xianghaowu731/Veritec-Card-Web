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
  
  { field: 'card_type', headerName: 'Card Type', width: 140 },
  { field: 'status', headerName: 'Status', width: 140 },
  { field: 'date', headerName: 'Date', width: 140 },
  { field: 'fname', headerName: 'Status', width: 140 },
  { field: 'lname', headerName: 'Status', width: 140 },
  { field: 'phone', headerName: 'Status', width: 140 },
  { field: 'id', headerName: 'Card ID', width: 140 },
]

const fakeRow = {  
  card_type: 'Card Type 1',
  status: 'Status 1',
  date: '12/2/2323',
  fname: 'Aalksdjnc',
  lname: 'cvsasdc',
  phone: '(123)12341234',
  id:'283401623987'
}

function loadServerRows({ page, rowsPerPage = 5, data }) {
  return new Promise(resolve => {
    setTimeout(() => {
      const rows = data.rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      const fakeRows = rows.map(one=>({...fakeRow, id: Utils.getKey().toUpperCase()}))
      resolve(fakeRows)
    }, Math.random() * 500 + 100) // simulate network latency
  })
}

export function CardsDataTable({}) {
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

  const gotoCardView = (data)=>{
    dispatch(setSelCard(data))
    navigate('/manage-cards/view')
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
        onCellClick={(data, event)=>{
          console.log('cellData : ', data.row)
          gotoCardView(data.row)
        }}
      />
    </div>
  )
}

class ManageCards extends React.Component {
  timer = null
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      beginDate: new Date(),
      endDate: new Date(),
      cardId: '',
      cardType: '',
      status: '',
      sortBy: '',
      progressValue: 0,
      openProgress: false,
      openNFCPorgress: false,
      nfcProgValue: 0,
    }
  }

  componentDidMount() {
    const { dispatch, userData, basicData } = this.props
  }

  onTapSearch = () => {}
  onPrint = () => {
    this.setState({
      openProgress: true,
    })

    if (this.timer) {
      clearInterval(this.timer)
      this.setState({ progressValue: 0 })
    }

    this.timer = setInterval(() => {
      let newVal = 0
      if (this.state.progressValue < 100) {
        newVal += this.state.progressValue + 5
      } else {
        newVal = 100
        clearInterval(this.timer)
        this.setState({
          openProgress: false,
        })
      }
      this.setState({
        progressValue: newVal,
      })
    }, 500)
  }
  onTapNFC = ()=>{
    this.setState({
      openNFCPorgress: true,
    })

    if (this.timer) {
      clearInterval(this.timer)
      this.setState({ nfcProgValue: 0 })
    }

    this.timer = setInterval(() => {
      let newVal = 0
      if (this.state.nfcProgValue < 100) {
        newVal += this.state.nfcProgValue + 5
      } else {
        newVal = 100
        clearInterval(this.timer)
        this.setState({
          openNFCPorgress: false,
        })
      }
      this.setState({
        nfcProgValue: newVal,
      })
    }, 500)
  }
  onStop = () => {
    this.setState({
      openProgress: false,
    })
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  onStopNFCProg = ()=>{
    this.setState({
      openNFCPorgress: false,
    })
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  render() {
    const { userData, classes } = this.props

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MainLayout menuIndex={3} >
          <Grid container spacing={3} style={{maxWidth: 1400,marginLeft:'auto', marginRight:'auto'}}>
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
                  <InputLabel htmlFor="filled-basic">Card ID</InputLabel>
                  <Input
                    id="filled-basic"
                    type={'text'}
                    value={this.state.cardId}
                    variant="filled"
                    onChange={e => {
                      this.setState({ cardId: e.target.value })
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

            <Grid item sm={6} xs={false}>
              <Typography
                variant="h5"
                style={{ float: 'right', marginTop: 10 }}
              >
                Available Cards: 1093
              </Typography>
            </Grid>

            <Grid item md={2} sm={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Card Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.cardType}
                  onChange={e => {
                    this.setState({ cardType: e.target.value })
                  }}
                >
                  <MenuItem value={1}>Card Type1</MenuItem>
                  <MenuItem value={2}>Card Type2</MenuItem>
                  <MenuItem value={3}>Card Type3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
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
                  // style={{ height: 45 }}
                >
                  <MenuItem value={1}>Ordered</MenuItem>
                  <MenuItem value={2}>Printed</MenuItem>
                  <MenuItem value={3}>NFC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="label-date-ordered">Sort by</InputLabel>
                <Select
                  labelId="label-date-ordered"
                  id="date-ordered-select"
                  value={this.state.sortBy}
                  fullWidth
                  onChange={e => {
                    this.setState({ sortBy: e.target.value })
                  }}
                >
                  <MenuItem value={1}>Date Ordered</MenuItem>
                  <MenuItem value={2}>Date Printed</MenuItem>
                  <MenuItem value={3}>Date NFC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} sm={false} xs={12}></Grid>
            <Grid item md={2} sm={4} xs={12}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start Date"
                format="MM/dd/yyyy"
                style={{ marginTop: 0 }}
                value={this.state.beginDate}
                onChange={date => {
                  this.setState({ beginDate: date })
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End Date"
                format="MM/dd/yyyy"
                style={{ marginTop: 0 }}
                minDate={this.state.beginDate}
                value={this.state.endDate}
                onChange={date => {
                  this.setState({ endDate: date })
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CardsDataTable />
            </Grid>
            <Grid item md={2} sm={3} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                fullWidth
                onClick={this.onPrint}
                // style={btnStyle}
              >
                Print
              </Button>
            </Grid>
            <Grid item md={2} sm={3} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                fullWidth
                onClick={this.onTapNFC}
                // style={btnStyle}
              >
                Write NFC
              </Button>
            </Grid>
            <Grid item md={2} sm={3} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                fullWidth
                // style={btnStyle}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
          <ProgressDlg
            open={this.state.openProgress}
            value={this.state.progressValue}
            onStop={this.onStop}
            handleClose={() => {}}
            textContent={
              <Typography variant="body1">
                Printing card 1/50
                <br />
                ID: 5555487269872541
              </Typography>
            }
          />
          <ProgressDlg
            open={this.state.openNFCPorgress}
            value={this.state.nfcProgValue}
            onStop={this.onStopNFCProg}
            handleClose={() => {}}
            textContent={
              <Typography variant="body1">
                Place card on writer 1/50
                <br />
                ID: 5555487269872541
              </Typography>
            }
          />
        </MainLayout>
      </MuiPickersUtilsProvider>
    )
  }
}

export default function(props) {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.app.userData)
  const classes = useStyles()

  return (
    <ManageCards
      {...props}
      dispatch={dispatch}
      userData={userData}
      classes={classes}
    />
  )
}
