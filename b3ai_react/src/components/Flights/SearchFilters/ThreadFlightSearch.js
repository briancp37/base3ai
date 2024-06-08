// import React, { useState } from 'react';
// import { Box, Button, TextField, MenuItem, Grid, InputAdornment } from '@mui/material';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import FlightLandIcon from '@mui/icons-material/FlightLand';
// // import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const travelOptions = ['Round trip', 'One-way'];
// const peopleOptions = [1, 2, 3, 4, 5, 6];
// const classOptions = ['Economy', 'Business', 'First'];

// const ThreadFlightSearch = () => {
//   const [tripType, setTripType] = useState(travelOptions[0]);
//   const [people, setPeople] = useState(1);
//   const [fareClass, setFareClass] = useState('Economy');
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [departureDate, setDepartureDate] = useState(null);
//   const [returnDate, setReturnDate] = useState(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <TextField
//               select
//               fullWidth
//               label="Trip Type"
//               value={tripType}
//               onChange={(e) => setTripType(e.target.value)}
//             >
//               {travelOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               select
//               fullWidth
//               label="People"
//               value={people}
//               onChange={(e) => setPeople(e.target.value)}
//             >
//               {peopleOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               select
//               fullWidth
//               label="Class"
//               value={fareClass}
//               onChange={(e) => setFareClass(e.target.value)}
//             >
//               {classOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               label="From"
//               value={origin}
//               onChange={(e) => setOrigin(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <FlightTakeoffIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               label="To"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <FlightLandIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <DatePicker
//               label="Departure Date"
//               value={departureDate}
//               onChange={(newValue) => setDepartureDate(newValue)}
//               renderInput={(params) => <TextField {...params} fullWidth />}
//             />
//           </Grid>
//           {tripType === 'Round trip' && (
//             <Grid item xs={6}>
//               <DatePicker
//                 label="Return Date"
//                 value={returnDate}
//                 onChange={(newValue) => setReturnDate(newValue)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//             </Grid>
//           )}
//         </Grid>
//         <Box sx={{ textAlign: 'center', mt: 2 }}>
//           <Button variant="contained" color="primary">
//             Search Flights
//           </Button>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default ThreadFlightSearch;
