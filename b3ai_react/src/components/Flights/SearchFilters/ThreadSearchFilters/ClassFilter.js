import React, { useState } from 'react';
import { Box, Button, InputAdornment, Popover, Radio, RadioGroup, List, ListItem, ListItemText, Typography, Slider, TextField, IconButton, FormControlLabel, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// import './TimeFilter.css';


export const ClassFilter = ({ flightSearchParams, editFlightSearchParamsArr }) => {

    console.log('ClassFilter.flightSearchParams', flightSearchParams);
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(flightSearchParams.params.selected_cabins || null);
    console.log('ClassFilter.value', value);
  
    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    // const handleChange = (key) => (event, newValue) => {
    //     console.log('handleChange', key, newValue);
    //     setValue(newValue);
    //     editFlightSearchParamsArr(key, newValue);
    //     handleClose();
    // };
    const handleChange1 = (event) => {
        console.log('handleChange.event.target', event.target);
        console.log('handleChange.event', event);
        const newValue = event.target.value;
        console.log('handleChange', 'class', newValue);
        setValue(newValue);
        editFlightSearchParamsArr('class', newValue);
    };

    const handleSelect = (value) => {
        setValue(value);
        editFlightSearchParamsArr('class', value);
        handleClose();
    };



    const open = Boolean(anchorEl);
    // const id = open ? 'stops-popover' : undefined;
    const map_class_to_kiwi = {'Economy':'M','Business':'C','First':'F'};
    const map_class_from_kiwi = {'M':'Economy','C':'Business','F':'First'};
    
    return (
        <Box style={{'padding-right':'0 !important'}}>
            <TextField
                label="Class"
                value={map_class_from_kiwi[value]}
                onClick={handleClick}
                fullWidth
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <ArrowDropDownIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }} className='class-box' style={{ 'padding':'0'}}>
                {/* <Typography variant="h6">Class</Typography> */}
                <List>
                    <ListItem 
                        key='M'
                        button 
                        selected={value === 'M'} 
                        onClick={() => handleSelect('M')}
                        sx={{'&.Mui-selected': {backgroundColor: 'rgba(0, 0, 0, 0.08)',}, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)',}}}
                    >
                        <ListItemText primary={'Economy'} />
                    </ListItem>
                    <ListItem 
                        key='C'
                        button 
                        selected={value === 'C'} 
                        onClick={() => handleSelect('C')}
                        sx={{'&.Mui-selected': {backgroundColor: 'rgba(0, 0, 0, 0.08)',}, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)',}}}
                    >
                        <ListItemText primary={'Business'} />
                    </ListItem>
                </List>
                </Box>
            </Popover>
      </Box>
    );
}; 
  
//   <FormControl onClick={handleClick} >
//   <InputLabel>Class</InputLabel>
//   <Select
//       onClick={handleClick}
//       value={classType}
//       onChange={(e) => setClassType(e.target.value)}
//       //   onChange={(e) => editFlightSearchParamsArr( 'num_adults', map_class_to_kiwi[e.target.value] )}
//       //   value={map_class_from_kiwi[flightSearchParams.params.selected_cabins]}
//       label="Class"
//   >
//       <MenuItem value="Economy">Economy</MenuItem>
//       <MenuItem value="Business">Business</MenuItem>
//       <MenuItem value="First">First</MenuItem>
//   </Select>
// </FormControl>