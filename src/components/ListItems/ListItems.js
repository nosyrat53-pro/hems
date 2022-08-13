import * as React from 'react';
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
import './ListItem.css';

export const mainListItems = (
  <React.Fragment>

  <Link to="/" style={{textDecoration: 'none !important',color: 'black !important'}}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>

    <Link to="/rooms">
    <ListItemButton>
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText primary="Rooms" />
    </ListItemButton>
    </Link>

    <Link to="/gas">
    <ListItemButton>
      <ListItemIcon>
        <PropaneIcon />
      </ListItemIcon>
      <ListItemText primary="Gas" />
    </ListItemButton>
    </Link>

    <Link to="/water">
    <ListItemButton>
      <ListItemIcon>
        <WaterIcon />
      </ListItemIcon>
      <ListItemText primary="Water" />
    </ListItemButton>
    </Link>

    <Link to="/settings">
    <ListItemButton>
      <ListItemIcon>
        <ElectricBoltIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    </Link>


    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}

    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);