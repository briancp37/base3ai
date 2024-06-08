// import React, { useState } from 'react';
// import { Box, Button, Popover, Typography, Slider, IconButton } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';

// export const TimeFilter = ({ flightSearchParams, editFlightSearchParamsArr }) => {
//   const [timesAnchorEl, setTimesAnchorEl] = useState(null);
//   const [times, setTimes] = useState([0, 23]); // Range slider values

//   const handleTimesClick = (event) => {
//     event.stopPropagation();
//     setTimesAnchorEl(event.currentTarget);
//   };

//   const handleTimesClose = () => {
//     setTimesAnchorEl(null);
//   };

//   const handleSliderChange = (event, newValue) => {
//     setTimes(newValue);
//   };

//   const handleClear = () => {
//     setTimes([0, 23]);
//   };

//   const handleApply = () => {
//     editFlightSearchParamsArr('outbound_depart_time_earliest', times[0]);
//     editFlightSearchParamsArr('outbound_depart_time_latest', times[1]);
//     handleTimesClose();
//   };

//   const timesOpen = Boolean(timesAnchorEl);

//   return (
//     <Box>
//       <Button onClick={handleTimesClick} endIcon={<FilterListIcon />}>
//         Times
//       </Button>
//       <Popover
//         open={timesOpen}
//         anchorEl={timesAnchorEl}
//         onClose={handleTimesClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >
//         <Box sx={{ p: 2, width: 300 }}>
//           <Typography variant="h6">Outbound Departure</Typography>
//           <Slider
//             value={times}
//             onChange={handleSliderChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={23}
//             step={1}
//             marks={[
//               { value: 0, label: '12:00 AM' },
//               { value: 6, label: '6:00 AM' },
//               { value: 12, label: '12:00 PM' },
//               { value: 18, label: '6:00 PM' },
//               { value: 23, label: '11:59 PM' }
//             ]}
//           />
//           <IconButton onClick={handleClear}>
//             <ClearIcon /> Clear
//           </IconButton>
//           <Button onClick={handleApply} variant="contained" color="primary">
//             Apply
//           </Button>
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

// // export default TimeFilter;