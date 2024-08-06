// client/src/SQLiteDataTable.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EditDialog from '../../components/EditDialog';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Typography, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import authService from "./../../services/authService";
import "../../App.css"

const EditPage = () => {
  const [data, setData] = useState([{result: 'No result'}]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [blockValue, setBlockValue] = useState("");
  const [type, setType] = useState(false);
  

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const errorHandle = { error: 'Invalid token' };
  let idd = 0;
  async function comps(){ 
    await fetch(`http://localhost:5000/edit`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(response => {
      if (!response.ok) {  // Check if response status is not OK
        if (response.status === 401 || response.status === 403) {
          console.error('Unauthorized or Forbidden access');
          authService.logOut()
          navigate('/login');
        } else {
          console.error('Error fetching data:', response.status, response.statusText);
        }
        throw new Error('Network response was not ok');  // Throw an error to be caught in the catch block
      }
      return response.json();
    })
      .then(data => {
        if (data.length === 0) {
          setData([{result: 'No result'}]);
          console.log('no result')
        } 
        else if ( data === errorHandle ){
          setData([{result: 'No Auth, please sign in'}]);
          navigate("/login")
        }
        else {
          setData(data);
        }
      })
      .catch(error => (console.error('Error fetching data:', error), navigate('/login')));
    }
    
    useEffect(() => {
      if (!authService.isLoggedIn()){
        navigate("/login");
      }
  
    }, []);

    useEffect(() => {
      comps();
    }, []);
  
    const theme = createTheme({
      components: {
        MuiFormControlLabel: {
          styleOverrides: {
            
          },
        },
      },
    });
      


  const handleClickOpen = (e) => {
    setOpen(true);
    if (e.target.id === ""){
      idd = e.target.parentNode.id;
    }
    else {
      idd = e.currentTarget.id;
    }
    setBlockValue(idd)
    if (e.currentTarget.getAttribute('type') === "delete") {
      setType("delete");
    }
    else {
      setType("submit");
    }

  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleRadioChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call your function here
      handleSearch();
    }
  };

  const isExpired = (expiryDate) => {
    const currentDate = moment(); // Get current date
    const expiryDateObj = moment(expiryDate, 'DD-MM-YYYY'); // Parse expiry date string into a moment object
    return expiryDateObj.isBefore(currentDate, 'day'); // Check if expiry date is before the current date
  };

  const handleSearch = () => {

    if (!selectedCategory) {
      alert('You have to pick the category of the search');
      return;
    }
    
    if (searchValue === "") {
      alert('You have to input a value');
      return;
    }

    fetch(`http://localhost:5000/search?query=${searchValue}&category=${selectedCategory}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setData([{result: 'No result'}]);
        } else {
          setData(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <Box sx={{ mt: 10}}>
      <ThemeProvider theme={theme}>
      <h1 className='mainHeader'>Cloud MS</h1>
      <div className="form">
        <OutlinedInput sx={{ 
         width: 800,
         borderTopRightRadius: 0, 
         borderBottomRightRadius: 0, 
         borderBottomLeftRadius: 30, 
         borderTopLeftRadius: 30, 
         height: 50, 
         paddingLeft: 1,
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         alignContent: "center"}}
         value={searchValue} onKeyUp={handleKeyPress} onChange={handleSearchInputChange}>
        <TextField label="Size" id="outlined-size-small" variant="outlined" size="small" value={searchValue} onChange={handleSearchInputChange} />
        </OutlinedInput>
        <Button variant="contained" onClick={handleSearch} sx={{ ":hover":{bgcolor: '#412288'}, backgroundColor: '#620CA4', borderColor: 'red', width: 200, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 30, borderBottomRightRadius: 30, fontWeight: "bold" }}>Search</Button>
      </div>
      <div className='radioGroup'>

        <FormControl sx={{ paddingBottom: 10}}>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: 2, color: '#ff5073', fontFamily: 'Inter', textShadow: '2px 2px 0.5px #542faa'}} >Search category</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="custID" checked={selectedCategory === 'custID'} onChange={() => handleRadioChange('custID')} 
        control={<Radio />} sx={{ color: '#000000' }} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Customer ID</Typography>} />
        <FormControlLabel value="nameEN" checked={selectedCategory === 'nameEN'} onChange={() => handleRadioChange('nameEN')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Name (EN)</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="nameAR" checked={selectedCategory === 'nameAR'} onChange={() => handleRadioChange('nameAR')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Name (AR)</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="nameC" checked={selectedCategory === 'nameC'} onChange={() => handleRadioChange('nameC')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Name (C)</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="services" checked={selectedCategory === 'services'} onChange={() => handleRadioChange('services')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Services</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="contractStatus" checked={selectedCategory === 'contractStatus'} onChange={() => handleRadioChange('contractStatus')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Contract Status</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="expiryDate" checked={selectedCategory === 'expiryDate'} onChange={() => handleRadioChange('expiryDate')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Expiry Date</Typography>} sx={{ color: '#000000'}} />
        <FormControlLabel value="notes" checked={selectedCategory === 'notes'} onChange={() => handleRadioChange('notes')} 
        control={<Radio />} label={<Typography color="black" fontWeight='bold' fontSize='17px' >Notes</Typography>} sx={{ color: '#000000'}} />
      </RadioGroup>
    </FormControl>
      </div>
      <TableContainer component={Paper}>
      <Table key="0" sx={{ minWidth: 1500 }} aria-label="simple table">
        <TableHead key="0" >
        <TableRow>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Customer ID</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(EN)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(AR)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(C)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Services</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Contract Status</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Expiry Date</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Notes</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, index) => {

          return(
        <TableRow key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.entries(row).map(([key, value], index) => {
            if (key === "accID") {
              idd = value;
              
            }
            else if(key !== 'accID') return (<TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#fafafa'}} style={{ color: isExpired(key === 'expiryDate' ? value : '') ? 'red' : 'inherit' }}>{value}</TableCell>)
            
            })}
            {Object.keys(row).length < 2 ? <></> : <TableCell sx={{ backgroundColor: '#fafafa' }} align='center' key="0" ><IconButton variant="outlined" id={idd} onClick={handleClickOpen} type="submit" sx={{ width: "40px" }} ><EditIcon id={idd} /></IconButton><IconButton variant="outlined" color="error" id={idd} onClick={handleClickOpen} type="delete" sx={{ width: "40px", m: 1}} ><DeleteForeverIcon id={idd} /></IconButton></TableCell>}
          </TableRow>
          )})}
          <EditDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        id={blockValue}
        type={type}
      />
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" size='large' onClick={handleClickOpen} id='add' sx={{ ":hover":{bgcolor: '#412288'}, backgroundColor: '#620CA4', m:7, width: '110px', borderRadius: '15px', height: '50px', fontSize: '19px',  }} >Add</Button>
    </ThemeProvider>
    <div class="animateme">
      <ul class="bg-bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
    </Box>
  );
};

export default EditPage;
