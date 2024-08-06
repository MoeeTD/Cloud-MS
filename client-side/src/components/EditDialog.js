import React, { useEffect, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import 'moment/locale/en-gb';



const EditDialog = (props) => {
    const token = localStorage.getItem('token');
    const { onClose, selectedValue, open, id, type } = props;

    const dialogDataInit = {
      accID: '',
      custID: '',
      nameEN:'',
      nameAR:'',
      nameC:'',
      services:'',
      expiryDate:'',
      contractStatus:'',
      notes:''
    }
    const [dialogData, setDialogData] = useState(dialogDataInit);
    const handleClose = () => {
    onClose(selectedValue);
    setDialogData(dialogDataInit);
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(dialogData)
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(dialogData)
    setDialogData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleDelete = async () => {
    window.location.reload();
    try {
      const response = await fetch(`http://localhost:5000/edit/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`
        }
      });
      const data = await response.json();
      console.log('Deleted:', data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
   

  const company = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?query=${id}&category=accID`);
      const data = await response.json();
      if (id === "add") {
        setDialogData(dialogDataInit);
      }
      else if (Array.isArray(data) && data.length === 0) {
        setDialogData({ result: 'No result' });
      } 
      else {
        setDialogData(data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (open) {
      company();
    }
  }, [props.open]);

  const contractStatus = [{
    value: 'Active',
    label: 'Active'
  },
  {
    value: 'Inactive',
    label: 'Inactive'
  },
  {
    value: 'Pending',
    label: 'Pending'
  }]
  
  const keyInput = (key, value, index) => {
      switch(key){
        case 'expiryDate':
          return(
            <Box
            sx={{
              '& > :not(style)': { m: 1, width: "260px", p: 1, ml: 2, mr: 2 },
            }}
            noValidate
            autoComplete="off"
            key={index}
            >
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
              <DatePicker label='Expiry Date' value={moment(value, 'DD-MM-YYYY')} onChange={(date) => handleChange({ target: { name: key, value: date ? date.format('DD-MM-YYYY') : '' } })} />
          </LocalizationProvider>
          </Box>
          )
          case 'contractStatus':
            return(
              <Box
            sx={{
              '& > :not(style)': { m: 1, width: "260px", p: 1, ml: 2, mr: 2 },
            }}
            noValidate
            autoComplete="off"
            key={index}
            >
          <TextField
          select
          label="Contract Status"
          name={key}
          value={value}
          onChange={handleChange}
          
        >
          {contractStatus.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
            </Box>
            )
            case 'accID': 
            return (
              <Box
            sx={{
              '& > :not(style)': { m: 1, width: "260px", p: 1 },
            }}
            noValidate
            autoComplete="off"
            key={index}
            >
              <TextField id="outlined-basic" inputProps={{ style: {width: 230}}} label={key} name={key} key={index} disabled variant="outlined" value={value} />
            </Box>
            )
        default:
          return(
            <Box
            sx={{
              '& > :not(style)': { m: 1, width: "260px", p: 1 },
            }}
            noValidate
            autoComplete="off"
            key={index}
            >
              <TextField id="outlined-basic" inputProps={{ style: {width: 230}}} label={key} name={key} key={index} onChange={handleChange} variant="outlined" value={value} />
            </Box>
          )
      }
  }

  if (type === "submit") {
    return (
      <Dialog onClose={handleClose} open={open} >
        <Box sx={{ pt:3 }}></Box>
        <form key="1" onSubmit={handleSubmit} >
        {
        Object.entries(dialogData).map(([key, value], index) => {
            return(
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {keyInput(key, value, index)}
              </Box>
          )
        })
  
        }
        <Button variant="contained" size="large" type="submit" sx={{width: "100%", height: "50px", fontSize: "25px", marginTop: "20px", borderRadius: "0px", fontFamily: "Monospace", ":hover":{bgcolor: '#412288'}, backgroundColor: '#620CA4'}} >{(id === "add") ? "Add" : "Submit"}</Button>
        </form>
      </Dialog>
    );
  }

  else {
    return (
      <Dialog onClose={handleClose} open={open}  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <DialogTitle key="0" sx={{m: 1, fontSize: 30}} >Delete company data</DialogTitle>
          <Box sx={{}}>
          <Typography variant="h5" component="h5" align='center' sx={{}}>
            Delete {id}?
          </Typography>
          <Button variant="contained" size="large" onClick={handleDelete} sx={{width: "100%", height: "50px", fontSize: "25px", marginTop: "35px", borderRadius: "0px", fontFamily: "Monospace", ":hover":{bgcolor: '#412288'}, backgroundColor: '#620CA4'}} >Yes</Button>
        </Box>
      </Dialog>
    );
  }
  
}


export default EditDialog;