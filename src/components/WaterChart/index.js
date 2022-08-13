import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, CartesianGrid, ComposedChart, Bar } from 'recharts';
import Title from '../Title/Title';
import axios from 'axios';
import { useState } from 'react';
import { Tooltip } from '@mui/material';


// Generate Sales Data
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

export default function Chart({filteredData}) {

  const [chartData,setChartData] = useState();
  const [actualData,setActualData] = useState();
  const theme = useTheme();

  const createChartData = (data) => {
    let dataArr = [];

    for(let i = data.length-1 ; i >= 0; i--){
      dataArr.push({time: data[i].date, amount: data[i].cost});
    }

    setActualData(dataArr) ;
  }

  React.useEffect(() => {

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

  return (
    <React.Fragment>
      {/* <Title>Today</Title> */}
      <ResponsiveContainer>
        <LineChart
          data={actualData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              الاستهلاك(ل.س)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>


      
    </React.Fragment>
  );
}