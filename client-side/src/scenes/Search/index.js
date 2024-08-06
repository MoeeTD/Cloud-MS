// client/src/SQLiteDataTable.js
import React, { useState } from 'react';
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
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import "../../App.css"

const Search = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

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


    <Box sx={{ mt: 10}} >
      <h1 className='mainHeader' >Cloud MS</h1>
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
         alignContent: "center",
         backgroundColor: ''}}
         value={searchValue} onChange={handleSearchInputChange} onKeyUp={handleKeyPress}  >
        <TextField label="Size" id="outlined-size-small" variant="outlined" size="small" value={searchValue} onChange={handleSearchInputChange} />
        </OutlinedInput>
        <Button variant="contained" onClick={handleSearch} sx={{ ":hover":{bgcolor: '#412288'}, backgroundColor: '#620CA4', borderColor: 'red', width: 200, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 30, borderBottomRightRadius: 30, fontWeight: "bold" }}>Search</Button>
      </div>
      <div className='radioGroup'>

        <FormControl sx={{ paddingBottom: 10 }} >
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 23, fontWeight: 'bold', marginBottom: 2, color: '#ff5073', fontFamily: 'Inter', textShadow: '2px 2px 0.5px #542faa'}} >Search category</FormLabel>
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
      {(!data.length) ? <div></div> : <Table sx={{ minWidth: 1500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Customer ID</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(EN)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(AR)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Name(C)</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Services</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Contract Status</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Expiry Date</TableCell>
            <TableCell align="center" sx={{fontWeight: '700', fontSize: '16px', backgroundColor: '#620ca4', color: 'white'}}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, index) => (
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.entries(row).map(([key, value]) => (  
          <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#fafafa'}} style={{ color: isExpired(key === 'expiryDate' ? value : '') ? 'red' : 'inherit' }}>{value}</TableCell>
          ))}
          </TableRow>
          ))}
        </TableBody>
      </Table>}
    </TableContainer>
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

export default Search;
