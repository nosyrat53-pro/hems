import * as React from 'react';
import {useState,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RoomIcon from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';
import PropaneIcon from '@mui/icons-material/Propane';
import WaterIcon from '@mui/icons-material/Water';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Title from '../../components/Title/Title';
import Container from '@mui/material/Container';
import MainContainer from '../MainContainer/MainContainer';
import axios from 'axios';

export default function Settings (){
    const [eleState,setEleState] = useState();

    useEffect(() => {

    axios.get(`http://home-ems.herokuapp.com/api/sensor/get`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      // console.log('data sensor',data.data.sensor);
      setEleState(data.data.sensor);
      // setChartData(data.data['0']);
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      // console.log('erro while logging in',error);
    })
    .finally(() => {

    })


    },[]);

    const handleSubmit = () => {

    }

    return <MainContainer>
    <Container sx={{
        margin: '25px auto'
    }}>

        <Title>Electricity Settings</Title>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
                margin="normal"
                required
                fullWidth
                name="Allowed consumption"
                label={'Allowed consumption'}
                type="number"
                id="password"
                min={0}
                autoComplete="Allowed consumption"
              />
            </Box>

    </Container>
  </MainContainer>
};