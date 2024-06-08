import React, { useEffect, useState } from 'react';
import { Box, TextField, Popover, Button } from '@mui/material';

import { styled } from '@mui/system';


const debouncedFunction = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

const CustomTextField = styled(TextField)(({ theme }) => ({
'& .MuiInputBase-input': {
    // paddingRight: '0px !important', // Ensure the padding-right is set to 0
    fontSize: '12px', // Change this value to adjust the text size
},
'& .MuiInputAdornment-root': {
    marginRight: '-14px', // Adjust this value to remove the unwanted padding
},
width: 'fit-content',
// width: 'auto',
}));



export const OriginDestinationFilter = ({ locType, flightSearchParams, editFlightSearchParamsArr }) => {
    const locTypeCap = locType.charAt(0).toUpperCase() + locType.slice(1).toLowerCase();
    console.log('DatesButton.flightSearchParams', flightSearchParams)
    const [anchorEl, setAnchorEl] = useState(null);
    const [location, setLocation] = useState(flightSearchParams.params[locType] || null);

    console.log('OriginDestinationFilter.location', location)

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };


    useEffect(() => {
        setLocation(flightSearchParams.params[locType] || '');
    }, [flightSearchParams.params[locType]]);

    // const debouncedEditFlightSearchParamsArr = debouncedFunction(editFlightSearchParamsArr, 500);

    // const handleLocationChange = (e) => {
    //     const newValue = e.target.value;
    //     setLocation(newValue);
    //     debouncedEditFlightSearchParamsArr(locType, newValue);
    // };
    const handleLocationChange = (e) => {
        const newValue = e.target.value;
        setLocation(newValue);
    };

    const handleBlur = () => {
        editFlightSearchParamsArr(locType, location);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'dates-popover' : undefined;


    return (
        <Box>
            <TextField
                sx = {{ fontSize: '12px' }}
                fullWidth
                label={locTypeCap}
                value={location}
                onClick={handleClick}
                onChange={handleLocationChange}
                onBlur={handleBlur}
                InputProps={{
                    sx: {
                        '& .MuiInputBase-input': {
                            fontSize: '12px', // Sets the text size of the input
                        }
                    }
                }}
                InputLabelProps={{
                    sx: {
                        fontSize: '12px', // Optionally sets the label text size if needed
                    }
                }}
                // onChange={(e) => setOrigin(e.target.value)}
                // onChange={(e) => editFlightSearchParamsArr( locType, e.target.value )}
            />

        </Box>
    );
};



            // <Popover
            //     id={id}
            //     open={open}
            //     anchorEl={anchorEl}
            //     onClose={handleClose}
            //     anchorOrigin={{
            //     vertical: 'bottom',
            //     horizontal: 'left',
            //     }}
            //     transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'left',
            //     }}
            //     disableRestoreFocus
            // >
            //     <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
            //         <LocalizationProvider dateAdapter={AdapterMoment}>
            //             <DatePicker
            //                 label="Outbound Date From"
            //                 value={dates.outbound_date_from}
            //                 onChange={handleDateChange('outbound_date_from')}
            //                 renderInput={(params) => <TextField {...params} />}
            //             />
            //         </LocalizationProvider>
            //     </Box>
            //     <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
            //         <LocalizationProvider dateAdapter={AdapterMoment}>
            //             <DatePicker
            //                 label="Outbound Date To"
            //                 value={dates.outbound_date_to}
            //                 onChange={handleDateChange('outbound_date_to')}
            //                 renderInput={(params) => <TextField {...params} />}
            //             />
            //         </LocalizationProvider>
            //     </Box>
            // </Popover>