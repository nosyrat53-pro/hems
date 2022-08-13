import React, {useEffect,useState} from 'react';
import './ControlPanel.css';
import MainContainer from '../MainContainer/MainContainer';
import Chart from '../../components/Chart/Chart';
import Deposits from '../../components/Deposits/Deposits';
import ConsumptionTable from '../../components/ConsumptionTable/ConsumptionTable';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright } from '@mui/icons-material';
import  ComposedChart  from '../../components/ComposedChart/index';
import axios from 'axios';
import Switch from '@mui/material/Switch';

const ControlPanel = () => {
  const [sensor,setSensor] = useState();
  const [state,setState] = useState(true);
  const label = { inputProps: { 'aria-label': 'switch' } };
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://home-ems.herokuapp.com/api/sensor/get`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      // console.log('data sensor',data.data.sensor);
      setSensor(data.data.sensor);
      // setChartData(data.data['0']);
      setState(data.data.sensor.interrupter_status);
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      // console.log('erro while logging in',error);
    })
    .finally(() => {

    })
    setInterval(() => {

    axios.get(`http://home-ems.herokuapp.com/api/sensor/get`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      // console.log('data sensor',data.data.sensor);
      setSensor(data.data.sensor);
      // setChartData(data.data['0']);
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      // console.log('erro while logging in',error);
    })
    .finally(() => {

    })
    }, 60000);
    
  },[])

  const handleChangeStatus = (e) => {
    setIsLoading(true);
    const ChangedStatus= !state;
    setState(prev => !prev);

      console.log(e.target.value);
    axios.post(`http://home-ems.herokuapp.com/api/sensor/sensor_status?status=${ChangedStatus ? 1: 0}`,{}, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`,"Accept": "application/json"}})
    .then((data) => {
        console.log('data change status',data)
        // setState(prev => !prev);
    })
    .catch((error) => {
        // setState(state);
        console.log('eror change status', error);
        setState(state);
    })
    .finally(() => {
        setIsLoading(false);
    })
  }

    return <MainContainer>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
        <h2>Main interrupter</h2>
        <Switch
           {...label} 
           checked={state} 
           onChange={(e) => handleChangeStatus(e)} 
           />
           <div style={{margin: '15px auto'}} />

    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
          
        </Paper>

        {/* <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <ComposedChart />
        </Paper>
        </Grid> */}

      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 240,
          }}
        >
          <Deposits sensor={sensor}/>
        </Paper>
      </Grid>
      {/* Recent ConsumptionTable */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ConsumptionTable />
        </Paper>
      </Grid>
    </Grid>
    <Copyright sx={{ pt: 4 }} />
  </Container>
  </MainContainer>
}

export default ControlPanel;