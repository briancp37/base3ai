import React, { useState } from 'react';
import { Box, Button, Popover, Radio, RadioGroup, Typography, TextField, Slider, IconButton, FormControlLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

import './TimeFilter.css';


export const StopsFilter = ({ flightSearchParams, editFlightSearchParamsArr }) => {

    console.log('StopsFilter.flightSearchParams', flightSearchParams);
    const [anchorEl, setAnchorEl] = useState(null);
    const [stops, setStops] = useState(flightSearchParams.params.max_num_layovers || 'any');
    console.log('StopsFilter.stops', stops);
  
    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleChange = (key) => (event, newValue) => {
        console.log('handleChange', key, newValue);
        setStops(newValue);
        editFlightSearchParamsArr(key, newValue);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const mapper = {
        'any': 'Any',
        '0': 'Nonstop',
        '1': '1 stop',
        '2': '2 stops'
    }

    return (
      <Box>
            {/* <Button onClick={handleClick} endIcon={<FilterListIcon />}>
                Stops
            </Button> */}
            <TextField
                label="Stops"
                value={mapper[stops]}
                onClick={handleClick}
                fullWidth
                InputProps={{
                readOnly: true,
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
                <Box sx={{ p: 2 }}>
                <Typography variant="h6">Stops</Typography>
                <RadioGroup 
                    value={stops} 
                    onChange={handleChange('max_num_layovers')}
                >
                    <FormControlLabel value="any" control={<Radio />} label="Any number of stops" />
                    <FormControlLabel value="0" control={<Radio />} label="Nonstop only" />
                    <FormControlLabel value="1" control={<Radio />} label="1 stop or fewer" />
                    <FormControlLabel value="2" control={<Radio />} label="2 stops or fewer" />
                </RadioGroup>
                </Box>
            </Popover>
      </Box>
    );
  };