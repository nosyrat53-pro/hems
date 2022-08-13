import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, CartesianGrid, ComposedChart, Bar, PieChart, Pie } from 'recharts';
import Title from '../Title/Title';
import axios from 'axios';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {

  const [chartData,setChartData] = useState();
  const [actualData,setActualData] = useState([]);
  const theme = useTheme();

  const createChartData = (data) => {
    let dataArr = [];

    for(let i = 0; i < 5; i++){
      dataArr.push({
        name: data[i].date,
        value: data[i].cost
        });
    }

    console.log('data for composed chart',dataArr);
    setActualData(dataArr) ;

    return dataArr;
  }

  React.useEffect(() => {
    axios.get(`http://home-ems.herokuapp.com/api/consumption/index`, 
    {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
    .then(data => {
      console.log('data from login',data.data['0']);
      // setChartData(data.data['0']);
      console.log('data data data data', data.data['0'])
      createChartData(data.data['0']);
      console.log(createChartData(data.data['0']));
    
      setTimeout(() => {
        console.log('actual actual actual',actualData)
      },1500)
    })
    .catch(error => {
      // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
      console.log('erro while logging in',error);
    })
    .finally(() => {
    })

  },[]);
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];

  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          {/* <Pie data={data01} 
          dataKey="value" 
          cx="50%" 
          cy="50%" 
          outerRadius={60} 
          fill="#8884d8" 
          /> */}
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}