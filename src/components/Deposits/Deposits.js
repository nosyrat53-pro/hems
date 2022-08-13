import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({sensor}) {
  return (
    <div style={{display: 'flex', width: '100%',height: '100%',flexDirection: 'column',justifyContent: 'space-between'}}>
      <Typography component="p" variant="">Current Consumption</Typography>
      <Typography component="p" variant="h5" sx={{color: 'green', marginBottom: '15px'}}>
        {sensor?.current_consumption} kWh
      </Typography>

      <Typography component="p" variant="">Current Voltage</Typography>
      <Typography component="p" variant="h5" sx={{color: 'green', marginBottom: '15px'}}>
      {sensor?.current_voltage} V
      </Typography>

      <Typography component="p" variant="">Current Cost</Typography>
      <Typography component="p" variant="h5" sx={{color: 'green'}}>
        {sensor?.current_consumption*40} s.p
      </Typography>

      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          
        </Link> */}
      </div>
    </div>
  );
}