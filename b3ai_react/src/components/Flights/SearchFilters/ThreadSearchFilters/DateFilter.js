import React, { useState } from 'react';
import { Box, TextField, Popover, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


export const OutboundDatesButton = ({ flightSearchParams, editFlightSearchParamsArr }) => {
    const directionStr = 'Outbound';
    console.log('DatesButton.flightSearchParams', flightSearchParams)
    const [anchorEl, setAnchorEl] = useState(null);
    const [dates, setDates] = useState({
        outbound_date_from: flightSearchParams.params.outbound_date_from ? moment(flightSearchParams.params.outbound_date_from, "DD/MM/YYYY") : null,
        outbound_date_to: flightSearchParams.params.outbound_date_to ? moment(flightSearchParams.params.outbound_date_to, "DD/MM/YYYY") : null,
        return_date_from: flightSearchParams.params.return_date_from ? moment(flightSearchParams.params.return_date_from, "DD/MM/YYYY") : null,
        return_date_to: flightSearchParams.params.return_date_to ? moment(flightSearchParams.params.return_date_to, "DD/MM/YYYY") : null,
    });
    console.log('DatesButton.dates', dates)

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleDatePickerClick = (event) => {
        event.stopPropagation();
    };
    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = ( key ) => ( newValue ) => {
        console.log('handleDateChange', key, newValue);
        editFlightSearchParamsArr(key, newValue.format('DD/MM/YYYY'));
    };



  const open = Boolean(anchorEl);
  const id = open ? 'dates-popover' : undefined;

  const formatDateRange = (start, end) => {
    if (!start || !end) return 'Select dates';
    const formattedStart = moment(start).format('ddd MMM D');
    const formattedEnd = moment(end).format('ddd MMM D');
    return `${formattedStart} - ${formattedEnd}`;
  };


  return (
    <Box>
      <TextField
        label="Outbound"
        value={formatDateRange(dates.outbound_date_from, dates.outbound_date_to)}
        onClick={handleClick}
        fullWidth
        InputProps={{
            readOnly: true,
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
        sx={{ fontSize: '12px' }}
      />
      <Popover
        id={id}
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
        disableRestoreFocus
      >
      <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Outbound Date From"
              value={dates.outbound_date_from}
              onChange={handleDateChange('outbound_date_from')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Outbound Date To"
              value={dates.outbound_date_to}
              onChange={handleDateChange('outbound_date_to')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Popover>
    </Box>
  );
};

// export default DatesButton;




export const ReturnDatesButton = ({ flightSearchParams, editFlightSearchParamsArr }) => {
    const directionStr = 'Return';
    console.log('DatesButton.flightSearchParams', flightSearchParams)
    const [anchorEl, setAnchorEl] = useState(null);
    const [dates, setDates] = useState({
        return_date_from: flightSearchParams.params.return_date_from ? moment(flightSearchParams.params.return_date_from, "DD/MM/YYYY") : null,
        return_date_to: flightSearchParams.params.return_date_to ? moment(flightSearchParams.params.return_date_to, "DD/MM/YYYY") : null,
    });
    console.log('DatesButton.dates', dates)

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleDatePickerClick = (event) => {
        event.stopPropagation();
    };
    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = ( key ) => ( newValue ) => {
        console.log('handleDateChange', key, newValue);
        editFlightSearchParamsArr(key, newValue.format('DD/MM/YYYY'));
    };



  const open = Boolean(anchorEl);
  const id = open ? 'dates-popover' : undefined;

  const formatDateRange = (start, end) => {
    if (!start || !end) return 'Select dates';
    const formattedStart = moment(start).format('ddd MMM D');
    const formattedEnd = moment(end).format('ddd MMM D');
    return `${formattedStart} - ${formattedEnd}`;
  };


  return (
    <Box>
      <TextField
        label="Return"
        value={formatDateRange(dates.return_date_from, dates.return_date_to)}
        onClick={handleClick}
        fullWidth
        InputProps={{
            readOnly: true,
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
        sx={{ fontSize: '12px' }}
      />
      <Popover
        id={id}
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
        disableRestoreFocus
      >
      <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Return Date From"
              value={dates.return_date_from}
              onChange={handleDateChange('return_date_from')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      <Box sx={{ p: 2 }} className="popover-content" onClick={handleDatePickerClick}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Return Date To"
              value={dates.return_date_to}
              onChange={handleDateChange('return_date_to')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Popover>
    </Box>
  );
};


// import React, { useState } from 'react';
// import { Box, TextField, Popover, Button } from '@mui/material';
// import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers';
// // import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import moment from 'moment';

// const DatesButton = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [value, setValue] = useState([null, null]);

//   const handleClick = (event) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'dates-popover' : undefined;

//   const formatDateRange = (range) => {
//     if (!range[0] || !range[1]) return 'Select dates';
//     const start = moment(range[0]).format('ddd MMM D');
//     const end = moment(range[1]).format('ddd MMM D');
//     return `${start} - ${end}`;
//   };

//   return (
//     <Box>
//       <TextField
//         label="Departure"
//         value={formatDateRange(value)}
//         onClick={handleClick}
//         fullWidth
//         InputProps={{
//           readOnly: true,
//         }}
//       />
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >
//         <Box sx={{ p: 2 }} className="popover-content">
//           <LocalizationProvider dateAdapter={AdapterMoment}>
//             <DateRangePicker
//               startText="Start"
//               endText="End"
//               value={value}
//               onChange={(newValue) => {
//                 setValue(newValue);
//               }}
//               renderInput={(startProps, endProps) => (
//                 <div className="date-range-picker">
//                   <TextField {...startProps} />
//                   <Box sx={{ mx: 2 }}> to </Box>
//                   <TextField {...endProps} />
//                 </div>
//               )}
//             />
//             <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
//               Done
//             </Button>
//           </LocalizationProvider>
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

// export default DatesButton;





// import React, { useState } from 'react';
// import { Box, TextField, Popover, Typography, Button } from '@mui/material';
// import { DateRangePicker, LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import moment from 'moment';

// const DatesButton = () => {
// const [anchorEl, setAnchorEl] = useState(null);
// const [value, setValue] = useState([null, null]);

// const handleClick = (event) => {
// event.stopPropagation();
//     setAnchorEl(event.currentTarget);
// };

// const handleClose = () => {
//     setAnchorEl(null);
// };

// const open = Boolean(anchorEl);
// const id = open ? 'dates-popover' : undefined;

// const formatDateRange = (range) => {
//     if (!range[0] || !range[1]) return 'Select dates';
//     const start = moment(range[0]).format('ddd MMM D');
//     const end = moment(range[1]).format('ddd MMM D');
//     return `${start} - ${end}`;
// };

// return (
//     <Box>
//     <TextField
//         label="Departure"
//         value={formatDateRange(value)}
//         onClick={handleClick}
//         fullWidth
//         InputProps={{
//         readOnly: true,
//         }}
//     />
//     <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'left',
//         }}
//         transformOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//         }}
//     >
//         <Box sx={{ p: 2 }} className="popover-content">
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateRangePicker
//             startText="Start"
//             endText="End"
//             value={value}
//             onChange={(newValue) => {
//                 setValue(newValue);
//             }}
//             renderInput={(startProps, endProps) => (
//                 <div className="date-range-picker">
//                 <TextField {...startProps} />
//                 <Box sx={{ mx: 2 }}> to </Box>
//                 <TextField {...endProps} />
//                 </div>
//             )}
//             />
//             <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
//             Done
//             </Button>
//         </LocalizationProvider>
//         </Box>
//     </Popover>
//     </Box>
// );
// };

// export default DatesButton;
  