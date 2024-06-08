import React, { useState, useEffect, memo } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { Popover, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TimeFilter, TimeFilterOld } from './ThreadSearchFilters/TimeFilter';
import { OutboundDatesButton, ReturnDatesButton } from './ThreadSearchFilters/DateFilter';
import { Slider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import LocationSearch from './ThreadSearchFilters/LocationSearch';
import { OriginDestinationFilter } from './ThreadSearchFilters/OriginDestinationFilter';
import { StopsFilter } from './ThreadSearchFilters/StopsFilter';
import { ClassFilter } from './ThreadSearchFilters/ClassFilter';
import { DropdownFilter } from './ThreadSearchFilters/DropdownFilter';
import { RefreshButton } from './ThreadSearchFilters/RefreshButton';

const FlightSearchBar = ({ flightSearch, setEditableFlightSearchParamsArr }) => {
//   var flightSearchParams = flightSearch.params;
  console.log('FlightSearchBar.flightSearch', flightSearch);
  const aiMessageId = flightSearch.ai_message_id;
  const [flightSearchParams, setFlightSearchParams] = React.useState(flightSearch);
//   const [origin, setOrigin] = React.useState(flightSearchParams.params.origin || '');
  const [destination, setDestination] = React.useState(flightSearchParams.params.destination || '');
  const [stopsAnchorEl, setStopsAnchorEl] = React.useState(null);
  const [stops, setStops] = React.useState('any');
  const [date, setDate] = React.useState(new Date(flightSearchParams.params.outbound_date_from) || new Date());
  const [tripType, setTripType] = React.useState('one-way');
  const [passengers, setPassengers] = React.useState(1);
  const [classType, setClassType] = React.useState('Economy');
//   console.log('flightSearchParams', flightSearchParams);
//   console.log('max_num_layovers', flightSearchParams.params.max_num_layovers);

  useEffect(() => {
    console.log('FlightSearchParams updated:', flightSearchParams);
  }, [flightSearchParams]);
  useEffect(() => {
    setFlightSearchParams(flightSearch);
  }, [flightSearch]);


  const handleStopsClick = (event) => {
    console.log('Button clicked', event.currentTarget); // Add this line
    event.stopPropagation();
    setStopsAnchorEl(event.currentTarget);
  };
  
  const handleStopsClose = () => {
    setStopsAnchorEl(null);
  };

  const handleStopsChange = (value) => {
    console.log('handleStopsChange.value', value);
    // console.log('handleStopsChange.event.target.value', event.target.value);
    setStops(value);
    editFlightSearchParamsArr('max_num_layovers', value);
    handleStopsClose();
  };

  const stopsOpen = Boolean(stopsAnchorEl);


  const handleClick = (event) => {
    event.stopPropagation();
};

  
//   const editFlightSearchParamsArr = async (paramKey, paramValue) => {
//     console.log('editFlightSearchParamsArr', paramKey, paramValue);
//     console.log('flightSearchParams', flightSearchParams);
//     setFlightSearchParams((prevFlightSearchParams) => {
//         const { datecreated, dateupdated, ...rest } = prevFlightSearchParams;
//         return {
//             ...rest,
//             params: {
//                 ...rest.params,
//                 // paramKey: paramValue
//                 [paramKey]: paramValue
//             }
//         };
//     });
//   };

  const editFlightSearchParamsArr = async (paramKey, paramValue) => {
    console.log('editFlightSearchParamsArr', paramKey, paramValue);
    setEditableFlightSearchParamsArr((prevEditableFlightSearchParamsArr) => {
      return prevEditableFlightSearchParamsArr.map((item) => {
        if (item.ai_message_id === aiMessageId) {
          const { datecreated, dateupdated, ...rest } = item;
          return {
            ...rest,
            params: {
              ...rest.params,
              [paramKey]: paramValue
            }
          };
        }
        return item;
      });
    });
  };


  const map_class_to_kiwi = {'Economy':'M','Business':'C','First':'F'};
  const map_class_from_kiwi = {'M':'Economy','C':'Business','F':'First'};

  return (
    <Box sx={{ maxWidth: '720px', alignItems: 'center', margin:'auto' }}>
        {/* <DropdownFilter
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr}
                        filterName = 'tripType'
                        filterDisplayName = 'Trip Type'
                        values = {['one-way','round-trip']}
                        valueDefault = 'one-way'
                        mapValueToDisplay = {{'one-way':'One-Way','round-trip':'Round-Trip'}}
                    /> */}

        <Box sx={{ padding: '7px 0 0 0 !important' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item sx={{ display: 'inline-flex', width: 'auto' }}>
                    <DropdownFilter
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr}
                        filterName = 'tripType'
                        filterDisplayName = 'Trip Type'
                        values = {['one-way','round-trip']}
                        valueDefault = 'one-way'
                        mapValueToDisplay = {{'one-way':'One-Way','round-trip':'Round-Trip'}}
                        widthOverride = '140px'
                    />
                </Grid>
                <Grid item>
                    <DropdownFilter
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr}
                        filterName = 'num_adults'
                        filterDisplayName = 'Passengers'
                        values = {['1','2','3','4','5','6','7','8']}
                        valueDefault = '1'
                        mapValueToDisplay = {{'1':'  1','2':'  2','3':'  3','4':'  4','5':'  5','6':'  6','7':'  7','8':'  8'}}
                        widthOverride = '90px'
                    />
                </Grid>
                <Grid item>
                    <DropdownFilter
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr}
                        filterName = 'class'
                        filterDisplayName = 'Class'
                        values = {['M','C','F']}
                        valueDefault = 'M'
                        mapValueToDisplay = {{'M':'Economy','C':'Business','F':'First'}}
                        widthOverride = '130px'
                    />
                </Grid> 
                <Grid item>
                    <DropdownFilter
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr}
                        filterName = 'num_layovers'
                        filterDisplayName = 'Stops'
                        values = {['any','0','1','2','3']}
                        valueDefault = 'any'
                        mapValueToDisplay = {{'any':'Any','0':'Nonstop','1':'1 stop max','2':'2 stops max','3':'3 stops max'}}
                        nullValue = 'any'
                        widthOverride = '150px'
                    />
                </Grid>
                <Grid item>
                    <TimeFilterOld 
                        flightSearchParams={flightSearchParams} 
                        editFlightSearchParamsArr={editFlightSearchParamsArr} 
                    />
                </Grid>
            </Grid>
        </Box>
        

        <Box sx={{ padding: '12px 0 0 0 !important' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs >
                    <OriginDestinationFilter locType="origin" flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
                </Grid>
                <Grid item>
                    <IconButton sx={{padding:'0px !important'}}>
                        <SwapHorizIcon sx={{padding:'0 !important'}}/>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <OriginDestinationFilter locType="destination" flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
                </Grid>
                <Grid item>
                    <OutboundDatesButton flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
                </Grid>
                <Grid item>
                    <ReturnDatesButton flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
                </Grid>
            </Grid>
        </Box>


        {/* <Box sx={{ padding: '7px 0 0 0 !important', display: 'flex', gap: 2, alignItems: 'center' }}>
   



            <TimeFilter flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
           
            <OutboundDatesButton flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
            <ReturnDatesButton flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
            <LocationSearch flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
            <OriginDestinationFilter locType="origin" flightSearchParams={flightSearchParams} editFlightSearchParamsArr={editFlightSearchParamsArr} />
                <StopsFilter/>
        </Box> */}
    </Box>
  );
};

export default memo(FlightSearchBar); 








{/* <Grid item>
<Button variant="contained" color="primary" startIcon={<SearchIcon />}>
    Search
</Button>
</Grid>
<Grid item>
<Button variant="outlined" startIcon={<FilterListIcon />}>
    All filters
</Button>
</Grid> */}