import React, { useEffect } from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
import './App.css';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ControlPanelScreen from './screens/ControlPanel/ControlPanel';
import { useSelector } from 'react-redux';
import Rooms from './screens/Rooms/Rooms';
import GasScreen from './screens/GasScreen/index';
import WaterScreen from './screens/WaterScreen/index';
import ForgetPassword from './screens/ForgetPassword/index';
import ResetPassword from './screens/ResetPassword/index';
import Settings from './screens/Settings/index';

function App() {

  // const lang = useSelector((state) => state.language.lang);
  // useEffect(() => {
  //   console.log(lang);
  // },[])

  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem('hems_token');

    if(!userToken){
      navigate('/signin')
    }
  },[])
  return (
    <div className="App">
      

      <Routes>
        <Route path="/signup" element={<SignUpScreen /> } />
        <Route path="/signin" element={<SignInScreen /> } />
        <Route path="/" element={<ControlPanelScreen /> } />
        <Route path="/rooms" element={<Rooms />}/>
        <Route path='/gas' element={<GasScreen />} />
        <Route path='/water' element={<WaterScreen />} />
        <Route path='/forgetPassword' element={<ForgetPassword/>} />
        <Route path='/resetPassword' element={<ResetPassword/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
   
    </div>
  );
}

export default App;
