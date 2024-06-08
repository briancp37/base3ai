import React, { useState } from 'react';
import { Box, Button, InputAdornment, Popover, Radio, RadioGroup, List, ListItem, ListItemText, Typography, Slider, TextField, IconButton, FormControlLabel, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';


// import './Date Filters.css';


{/* <DropdownFilter
    filterName = 'tripType'
    filterDisplayName = 'Trip Type'
    values = {['M','C','F']}
    valueDefault = 'M'
    mapValueToDisplay = {{'M':'Economy','C':'Business','F':'First'}}
/> */}

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      paddingRight: '0px !important', // Ensure the padding-right is set to 0
      fontSize: '12px', // Change this value to adjust the text size
    },
    '& .MuiInputAdornment-root': {
      marginRight: '-14px', // Adjust this value to remove the unwanted padding
    },
    width: 'fit-content',
    // width: 'auto',
  }));



export const DropdownFilter = ({ 
    flightSearchParams, 
    editFlightSearchParamsArr,
    filterName,                   // = 'tripType',
    filterDisplayName,            // = 'Trip Type',
    values,                       // = ['M','C','F'],
    valueDefault,                 // = flightSearchParams.params[filterName] || 'M';,
    mapValueToDisplay,            // = {'M':'Economy','C':'Business','F':'First'},
    nullValue,
    widthOverride
}) => {

    // const filterName = 'tripType';
    // const filterDisplayName = 'Trip Type';
    // const values = ['M','C','F']
    // const valueDefault = flightSearchParams.params[filterName] || 'M';
    // const mapValueToDisplay = {'M':'Economy','C':'Business','F':'First'};
    

    console.log('DropdownFilter.flightSearchParams', flightSearchParams);

    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(flightSearchParams.params[filterName] || valueDefault);

    console.log('DropdownFilter.value', value);
  

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
    // const handleChange1 = (event) => {
    //     console.log('handleChange.event.target', event.target);
    //     console.log('handleChange.event', event);
    //     const newValue = event.target.value;
    //     console.log('handleChange', 'class', newValue);
    //     setValue(newValue);
    //     editFlightSearchParamsArr('class', newValue);
    // };

    const handleSelect = (value) => {
        setValue(value);
        editFlightSearchParamsArr(filterName, value);
        handleClose();
    };



    const open = Boolean(anchorEl);
    // const id = open ? 'stops-popover' : undefined;
    // const map_class_to_kiwi = {'Economy':'M','Business':'C','First':'F'};
    const widthStr = widthOverride ? widthOverride + ' !important' : '140px !important';
    console.log('DropdownFilter.widthStr', widthStr)
    
    return (
       <Box sx={{ display: 'inline-flex !important', gap: 2, alignItems: 'center', width:widthStr }}>
            <CustomTextField
                label={filterDisplayName}
                value={mapValueToDisplay[value] || value}
                onClick={handleClick}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton>
                            <ArrowDropDownIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                }}
                InputLabelProps={{
                    sx: {
                        fontSize: '12px', // Optionally sets the label text size if needed
                    }
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
                <Box sx={{ p: 0, width:'auto'}} className='dropdown-box'>
                    <List>
                        {values.map((key) => (
                            <ListItem
                                key={key}
                                button
                                selected={value === key}
                                onClick={() => handleSelect(key)}
                                sx={{
                                    '&.Mui-selected': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                }}
                            >
                                <ListItemText 
                                    primary={mapValueToDisplay[key] || key} 
                                    primaryTypographyProps={{ sx: { fontSize: '11px' } }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Popover>
      </Box>
    );
}; 