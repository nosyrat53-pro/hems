import { Grid, TextField } from '@mui/material';
import React, {useState,useEffect,useRef} from 'react';
import './Room.css';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const Room = ({id,room_device,status}) => {

    const label = { inputProps: { 'aria-label': 'switch' } };
    const [state,setState] = useState(status);
    const [isLoading,setIsLoading] = useState(false);
    const [isDeleting,setIsDeleting] = useState(false);
    const [hideRoomAfterDeleting,setHideRoomAfterDeleting] = useState(false);
    const [errorDeleting,setErrorDeleting] = useState(false);
    const UpdateRoomRef = useRef();

    const [open, setOpen] = useState(false);
    const [openEdit,setOpenEdit] = useState(false);
    const [selectedRoom,setSelectedRoom] = useState();
    const [editRomeName,setEditRoomName] = useState(room_device)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const addRoom = () => {
      //http://home-ems.herokuapp.com/api/interrupter/store?room_device=my bedroom
      axios.post(`http://home-ems.herokuapp.com/api/interrupter/store?room_device=my bedroom`,{}, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`,"Accept": "application/json"}})
        .then((data) => {
            console.log('data change status',data) 
        })
        .catch((error) => {
            setState(state);
            console.log('eror change status', error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleOpenEdit = () => {
        setOpenEdit(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleCloseEdit = () => {
        setOpenEdit(false);
      }

      const handleEditRoom = (event) => {

        
        console.log(editRomeName);
        axios.post(`http://home-ems.herokuapp.com/api/interrupter/update/${id}?room_device=${editRomeName}`,{}, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`,"Accept": "application/json"}})
        .then((data) => {
            console.log('data changed successfully',data)
        })
        .catch((error) => {
            console.log('error updating', error);
        })
        .finally(() => {
            handleCloseEdit();
        })

      }

    const handleChangeStatus = () => {
        const ChangedStatus = !state;
        setState(prevState => !prevState);
        setIsLoading(true);

        axios.post(`http://home-ems.herokuapp.com/api/interrupter/on_off/${id}?status=${ChangedStatus ? '1' : '0'}`,{}, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`,"Accept": "application/json"}})
        .then((data) => {
            console.log('data change status',data)
            
        })
        .catch((error) => {
            setState(state);
            console.log('eror change status', error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const DeleteInterRubter = () => {
        setIsDeleting(true);


        axios.delete(`http://home-ems.herokuapp.com/api/interrupter/delete/${id}`,
        {headers: {"Authorization": `Bearer ${localStorage.getItem('hems_token')}`}})
        .then((data) => {
            console.log('deleted successfully',data);
            setHideRoomAfterDeleting(true);
            handleClose();
        })
        .catch((error) => {
            console.log('error happened while deletting',error);
            setErrorDeleting(true);

            setTimeout(() => {
                handleClose();
                setErrorDeleting(false);
            },3500)

        })
        .finally(() => {
            // handleClose();
            setIsDeleting(false);
        })
    }

    return <><Grid item md={4}  sx={{
        borderRadius: '18px',
        background: '#1976d244',
        boxShadow:  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
       minHeight: '200px',
       minWidth: '200px',
       cursor: 'pointer',
       display: hideRoomAfterDeleting ? 'none' : '',
       transition: 'all 125ms ease-in',
       '&:hover':{
        transform: 'scale(0.98) !important',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
       }
    }}>
    <IconButton aria-label="delete" title='Delete' onClick={handleClickOpen} > 
     <DeleteIcon style={{color: 'red'}}/>
    </IconButton>

    <IconButton aria-label="delete" title='Delete' onClick={handleOpenEdit} > 
        <EditIcon />
    </IconButton>
           <h3 style={{textTransform: 'capitalize'}}>{editRomeName}</h3>

           <Switch 
           {...label} 
           checked={state} 
           onChange={handleChangeStatus} 
           disabled={isLoading}
           />
           <h4>
            {state ? 'ON' : 'Off'}
            </h4>


    </Grid>
    <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >

    {

        errorDeleting ?  
        <DialogTitle id="responsive-dialog-title">
            <h3>حدثت مشكلة ما اثناء عملية الحذف يرجى المحاولة لاحقا</h3>
            </DialogTitle>
        : 
        (
            <>
                <DialogTitle id="responsive-dialog-title">
      {"هل أنت متأكد من إتمام علمية الحذف ؟"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {isDeleting ? 
        <div style={{width: '100%',textAlign: 'center', margin: '30px auto'}}> 
            <CircularProgress color="secondary" /> 
        </div>:
         "في حال الحذف لن تكون قادرا على استعادة المعلومات مرة اخرى "}
      </DialogContentText>
    </DialogContent>
   
        {
            isDeleting ? null : 
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                تجاهل
            </Button>
            <Button onClick={DeleteInterRubter} autoFocus>
                متابعة
            </Button>
            </DialogActions>
        }</>
        )

    }


    </Dialog>


  <Dialog
        fullScreen={fullScreen}
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`${room_device} تعديل معلومات `}
        </DialogTitle>
        <DialogContent>
        <Box component="form" noValidate onSubmit={handleEditRoom} sx={{ mt: 1 }}>
            <TextField
            margin="normal"
                required
                fullWidth
                id="room"
                label={'تعديل اسم الغرفة'}
                name="text"
                autoComplete="room"
                autoFocus
                defaultValue={editRomeName}
                onChange={(e) => {setEditRoomName(e.target.value)}}
                />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {handleCloseEdit(); setEditRoomName(room_device)}}>
            تجاهل التعديلات
          </Button>
          <Button type="submit" onClick={handleEditRoom} autoFocus>
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>

    </>
}

export default Room;