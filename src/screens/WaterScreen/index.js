import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title/Title';
import {useState,useEffect} from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid, Paper } from '@mui/material';
import MainContainer from '../MainContainer/MainContainer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, CartesianGrid, ComposedChart, Bar } from 'recharts';
import { useTheme } from '@mui/material/styles';
import WaterChart from '../../components/WaterChart/index';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';

function preventDefault(event) {
  event.preventDefault();
}
function createData(time, amount) {
  return { time, amount };
}
const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];
export default function GasScreen() {

  const [tableData,setTableData] = useState([]);
  const [total,setTotal] = useState(5);
  const [isLoadingTotal,setIsLoadingTotal] = useState(false);
  const [startTime,setStartTime] = useState(undefined);
  const [endTime,setEndTime] = useState(undefined);
  const [showAll,setShowAll] = useState(true);
  const [isFilter,setIsFilter] = useState(false);
  const [actualData,setActualData] = useState();
  const theme = useTheme();

  const createChartData = (data) => {
    let dataArr = [];

    for(let i = 0; i < data.length; i++){
      dataArr.push({time: data[i].date, amount: data[i].cost});
    }
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',dataArr);
    setActualData(dataArr) ;
  }

  const handleSeeMore = () => {
    setIsLoadingTotal(true);
    
    setTimeout(() => {
      setTotal(prevTotal => prevTotal+5);

      setIsLoadingTotal(false);
    },1500)

  }

  const handleShowAll = () => {
    setShowAll(true);
    setStartTime(undefined);
    setEndTime(undefined);
  }

  useEffect(() => {

    if(startTime && endTime){

      setIsFilter(true);
      console.log(`http://home-ems.herokuapp.com/api/water/consumption/index?start_date=${startTime}&end_date=${endTime}`);

    axios.get(`http://home-ems.herokuapp.com/api/water/consumption/index?start_date=${startTime}&end_date=${endTime}`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      console.log('data from login',data.data['0']);
      setTableData(data.data['0']);
      createChartData(data.data['0']);
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      console.log('erro while logging in',error);
    })
    .finally(() => {
    
    })

  }

    if(showAll == true) {

      setIsFilter(false)

      axios.get(`http://home-ems.herokuapp.com/api/water/consumption/index`, 
      {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
      .then(data => {
        console.log('data from login',data.data['0']);
        setTableData(data.data['0']);
        
      })
      .catch(error => {
        // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
        console.log('erro while logging in',error);
      })
      .finally(() => {
    
      })
    }

  },[startTime,endTime,showAll]);


  useEffect(() => {
    axios.get(`http://home-ems.herokuapp.com/api/water/consumption/index`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      console.log('data from login',data.data['0']);
      setTableData(data.data['0']);
      
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      console.log('erro while logging in',error);
    })
    .finally(() => {
  
    })

    axios.get(`http://home-ems.herokuapp.com/api/water/consumption/index`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      console.log('data from login',data.data['0']);
      // setChartData(data.data['0']);
      
      createChartData(data.data['0']);
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      console.log('erro while logging in',error);
    })
    .finally(() => {
  
    })
  },[])

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save(`${tableData[0].date}-${tableData[total].date}.pdf`);
      })  
    ;
  }

  const handleStartTime = (e) => {
    console.log('startr time',e.target.value);
    setStartTime(e.target.value);
    setShowAll(false);
  }
  
  const handldeEndTime = (e) => {
    console.log('end time',e.target.value);
    setEndTime(e.target.value);
    setShowAll(false);
  }

  return (
    <MainContainer>
    <Container sx={{
        margin: '25px auto'
    }}>
      <div id="divToPrint">
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        > 
   
          <WaterChart />
      
        </Paper>
        </Grid>
          
          <div style={{margin: '30px',height: '2px',background: '#e2e2e2'}} />
        <div style={{margin: '10px auto'}}></div>
      <Title> جدول استهلاك المياه </Title>


      <div>
        {
      !showAll ? 
      <div>
      <Button 
      color='primary'
      sx={{margin: '15px auto',marginBottom: '0px', marginLeft: 'auto',maxWidth: '200px'}} 
      variant='contained' onClick={() => handleShowAll()}>Show All</Button>
      </div>
    :
      <div style={{width: '100%', textAlign: 'right'}}>
      <Button 
      color='primary'
      sx={{margin: '25px auto', marginLeft: 'auto',maxWidth: '200px'}} 
      variant='contained' onClick={() => setShowAll(false)}>Filter Data</Button>
      </div>
    }


 
        {
        showAll ? null : 
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '25px auto',
        marginBottom: '0px',
        paddingBottom: '25px',
        borderBottom: '2px solid #e2e2e2'
        }}>

        <div>
        <h4>Start Time</h4>
      <TextField
        id="date"
        label="Start-time"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleStartTime(e)}
      />
      </div>

        <div>
          <h4>End Time</h4>
      <TextField
        id="date"
        label="End-time"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handldeEndTime(e)}
      />
      </div>

      </div>
      }

      </div>


      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Consumption</TableCell>
            <TableCell>Cost</TableCell>
            {/* <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {isFilter ? 
          tableData?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.consumption_per_day}</TableCell>
              <TableCell>{row.cost} s.p</TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))
          : tableData?.slice(0,total)?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.consumption_per_day} liter</TableCell>
              <TableCell>{row.cost} s.p</TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      {
        isLoadingTotal ? 
        <div style={{width: '100%', textAlign: 'center',margin: '15px auto'}}>
      <CircularProgress color="secondary" />
        </div>
      :
      (total <= tableData.length-5 ? 
        <Link color="primary" href="#" onClick={handleSeeMore} sx={{ mt: 3 }}>
        See more data 
        </Link>
        :
        <Link color="primary" href="#" sx={{ mt: 3 }}>
          No More data 
        </Link> )
      }
      
      <div>
      <Button 
      color='primary' 
      sx={{margin: '30px auto', marginLeft: 'auto',maxWidth: '200px'}} 
      variant='contained' 
      onClick={() => printDocument()}>Export to pdf</Button>
      </div>



    </Container>
    </MainContainer>
  );
}