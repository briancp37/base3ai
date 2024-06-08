import React, { useState } from 'react';
import { Box, Button, Popover, Typography, Slider, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

import './TimeFilter.css';



export const TripTypeFilter = ({ flightSearchParams, editFlightSearchParamsArr }) => {
    console.log('TimeFilter.flightSearchParams', flightSearchParams);
    const [timesAnchorEl, setTimesAnchorEl] = useState(null);
    const [tripType, setTripType] = useState({
        outbound_depart_time_earliest: flightSearchParams.params.outbound_depart_time_earliest || 0,
        outbound_depart_time_latest: flightSearchParams.params.outbound_depart_time_latest || 24,
        outbound_arrive_time_earliest: flightSearchParams.params.outbound_arrive_time_earliest || 0,
        outbound_arrive_time_latest: flightSearchParams.params.outbound_arrive_time_latest || 24,
        return_depart_time_earliest: flightSearchParams.params.return_depart_time_earliest || 0,
        return_depart_time_latest: flightSearchParams.params.return_depart_time_latest || 24,
        return_arrive_time_earliest: flightSearchParams.params.return_arrive_time_earliest || 0,
        return_arrive_time_latest: flightSearchParams.params.return_arrive_time_latest || 24
    });
  
    const handleTimesClick = (event) => {
      event.stopPropagation();
      setTimesAnchorEl(event.currentTarget);
    };
  
    const handleTimesClose = () => {
      setTimesAnchorEl(null);
    };
  
    const handleSliderChange_ = (key) => (event, newValue) => {
        console.log('handleSliderChange', key, newValue)
        
        setTimes((prevTimes) => ({
            ...prevTimes,
            [key[0]]: newValue[0],
            [key[1]]: newValue[1],
        }));
        console.log('handleSliderChange.times', times)
    };

    const handleSliderChangeCommitted_ = (key) => (event, newValue) => {
        console.log('handleSliderChangeCommitted', key, newValue);
        editFlightSearchParamsArr(key[0], newValue[0]);
        editFlightSearchParamsArr(key[1], newValue[1]);
    };


  
    // const handleClear = (key1, key2) => () => {
    //   setTimes((prevTimes) => ({
    //     ...prevTimes,
    //     [key1]: 0,
    //     [key2]: 23
    //   }));
    // };
  //   const timesOpen = Boolean(timesAnchorEl);
    console.log('times', times);

    const timesOpen = Boolean(timesAnchorEl);
  
    return (
      <Box>
        <Button onClick={handleTimesClick} endIcon={<FilterListIcon />}>
          Times
        </Button>
        <Popover
          open={timesOpen}
          anchorEl={timesAnchorEl}
          onClose={handleTimesClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 300 }} className="times-box">
            <Typography variant="h6">Times</Typography>
            <Typography>Outbound Departure</Typography>
            <div className="times-slider-container">
                <Slider
                    className="times-slider"
                    value={[times.outbound_depart_time_earliest, times.outbound_depart_time_latest]}
                    onChangeCommitted={handleSliderChangeCommitted_(['outbound_depart_time_earliest','outbound_depart_time_latest'])}
                    onChange={handleSliderChange_(['outbound_depart_time_earliest','outbound_depart_time_latest'])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={23}
                    step={1}
                    marks={[
                    { value: 0, label: '12:00 AM' },
                    // { value: 6, label: '6:00 AM' },
                    { value: 12, label: '12:00 PM' },
                    // { value: 18, label: '6:00 PM' },
                    { value: 23, label: '11:59 PM' }
                    ]}
                />
            </div>
            <Typography>Outbound Arrival</Typography>
            <div className="times-slider-container">
                <Slider
                    value={[times.outbound_arrive_time_earliest, times.outbound_arrive_time_latest]}
                    onChangeCommitted={handleSliderChangeCommitted_(['outbound_arrive_time_earliest','outbound_arrive_time_latest'])}
                    onChange={handleSliderChange_(['outbound_arrive_time_earliest','outbound_arrive_time_latest'])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={23}
                    step={1}
                    marks={[
                    { value: 0, label: '12:00 AM' },
                    // { value: 6, label: '6:00 AM' },
                    { value: 12, label: '12:00 PM' },
                    // { value: 18, label: '6:00 PM' },
                    { value: 23, label: '11:59 PM' }
                    ]}
                />
            </div>
            <Typography>Return Departure</Typography>
            <div className="times-slider-container">
                <Slider
                    value={[times.return_depart_time_earliest, times.return_depart_time_latest]}
                    onChangeCommitted={handleSliderChangeCommitted_(['return_depart_time_earliest','return_depart_time_latest'])}
                    onChange={handleSliderChange_(['return_depart_time_earliest','return_depart_time_latest'])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={23}
                    step={1}
                    marks={[
                    { value: 0, label: '12:00 AM' },
                    // { value: 6, label: '6:00 AM' },
                    { value: 12, label: '12:00 PM' },
                    // { value: 18, label: '6:00 PM' },
                    { value: 23, label: '11:59 PM' }
                    ]}
                />
            </div>
            <Typography>Return Arrival</Typography>
            <div className="times-slider-container">
                <Slider
                    value={[times.return_arrive_time_earliest, times.return_arrive_time_latest]}
                    onChangeCommitted={handleSliderChangeCommitted_(['return_arrive_time_earliest','return_arrive_time_latest'])}
                    onChange={handleSliderChange_(['return_arrive_time_earliest','return_arrive_time_latest'])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={23}
                    step={1}
                    marks={[
                    { value: 0, label: '12:00 AM' },
                    // { value: 6, label: '6:00 AM' },
                    { value: 12, label: '12:00 PM' },
                    // { value: 18, label: '6:00 PM' },
                    { value: 23, label: '11:59 PM' }
                    ]}
                />
            </div>
          </Box>
        </Popover>
      </Box>
    );
  };