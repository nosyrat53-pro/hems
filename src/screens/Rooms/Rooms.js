import React, {useEffect,useState} from 'react';
import './Rooms.css';
import MainContainer from '../MainContainer/MainContainer';
import { Container } from '@mui/system';
import { Box, Grid, TextField, useMediaQuery } from '@mui/material';
import Room from '../../components/Room/Room';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Rooms = (props) => {
    const [rooms,setRooms] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [roomName,setRoomName] = useState('');
    const [roomEmpty,setRoomNameEmpty] = useState(false);

    useEffect(() => {
        
        axios.get(`http://home-ems.herokuapp.com/api/interrupter/index`, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
        .then(data => {
          console.log('data from login',data.data['0']);
          setRooms(data.data['0']);
          
        })
        .catch(error => {
          // setErrorMessage('ليس هنالك اي مستخدمين بهذه المعلومات')
          console.log('erro while logging in',error);
        })
        .finally(() => {
            setIsLoading(false);

        })
    },[])

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const handleRoomName = (e) => {
        setRoomName(e.target.value);
    }

    const addRoom = () => {

        if(roomName == '') {
            setRoomNameEmpty(true);
            setTimeout(() => {
                setRoomNameEmpty(false);
            },2000)
        }else {
            //http://home-ems.herokuapp.com/api/interrupter/store?room_device=my bedroom
            axios.post(`http://home-ems.herokuapp.com/api/interrupter/store?room_device=${roomName}`,{}, 
            {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`,"Accept": "application/json"}})
            .then((data) => {
                console.log('adding successfully',data) 
                setRooms(prev => [...prev,data.data['0']]);
                setOpen(false);
            })
            .catch((error) => {
            //   setState(state);
                console.log('error hapening while adding room', error);
            })
            .finally(() => {
            //   setIsLoading(false);
            
            })        
}
        
      };

    return <MainContainer>
        <Container>
        {
            <>
            <h2>إضافة غرفة</h2>
            <IconButton aria-label="delete" title='Add' onClick={handleClickOpen} > 
            <AddIcon style={{color: 'red'}}/>
            </IconButton>
        </>

        }
        <Grid gap={4} justifyContent='center' container sx={{marginTop: '50px'}} rowSpacing={2} columnSpacing={2} >
            
            {
                rooms.map((room,index) => {
                    return   <Room 
                    id={room.id} 
                    room_device={room.room_device} 
                    status={room.status} 
                    />
                })
            }
          
            {/* <Room />
            <Room />
            <Room /> */}
        </Grid>

        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {roomEmpty ? "الرجاء ملئ حقل اسم الغرفة" : "إضافة غرفة جديدة للنظام" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Box component="form" noValidate onSubmit={addRoom} sx={{ mt: 1 }}>
            <TextField
            margin="normal"
                required
                fullWidth
                id="room"
                label={'اسم الغرفة'}
                name="text"
                autoComplete="room"
                autoFocus
                defaultValue={roomName}
                onChange={(e) => {handleRoomName(e)}}
                />
        </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={addRoom} autoFocus>
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
        </Container>
    </MainContainer>
}

export default Rooms;