import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Grid, Box, Button, IconButton } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WifiIcon from '@mui/icons-material/Wifi';
import PowerIcon from '@mui/icons-material/Power';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import EcoIcon from '@mui/icons-material/Eco';

const backgroundColor = '#f43841'

const useStyles = makeStyles({
  root: {
    // maxWidth: 1080,
    margin: 'auto',
  },
  flightLegCard: {
    maxWidth: 600,
    margin: 'auto', 
    padding: '0px',
  },
  flightLegGrid1: {
    paddingTop: '8px',
    paddingLeft: '8px',
  },
  flightLegGrid2: {
    padding: '0px  !important',
    margin: '0px !important', 
  }, 
  flightLegGrid3: {
    padding: '0px  !important',
  }, 
  flightLegCardContent: {
    margin: '0px',
    '&:last-child': {
      paddingBottom: '0px  !important',
    },
  },
  flightSummaryCardContent: {
    paddingTop: '5px !important',
    paddingBottom: '5px !important',
  },
  flightLegSymbol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
  },
  flightLegTime: {
    color: '#28282b', 
  },
  flightLegDuration: {
    marginLeft: '10px',
    marginTop: '2px',
    marginBottom: '3px',
  },
  flightLegRightBox: {
    textAlign: 'right',
  },
  flightLayoverDuration: {
    maxWidth: 600,
    margin: 'auto', 
    paddingLeft: '5px',
  },
  layoverInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightDetails: {
    maxWidth: 720,
    alignItems: 'center',
    margin:'auto', //puts entire component in center of screen
  },
  flightColumnHeaders: {
    maxWidth: 720,
    alignItems: 'center',
    margin:'auto', //puts entire component in center of screen
  },
  flightIcon: {
    marginRight: 8,
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    paddingRight: '16px',
  },
  header: {
    color: '#28282b', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightHeader: {
    color: '#28282b', 
    fontSize:'10px'
  },
  selectButton: {
    marginLeft: 'auto',
  },
  userFavoriteIcon: {
    color: '#FFD700 !important', 
  },
  userFavoriteIconColor: {
    color: '#000000 !important', 
    padding: '0px !important',
    // margin: '0px !important',
  },
  userFavorite: {
    paddingRight: '10px',
  },
  threadFavoriteIcon: {
    color: '#fc5a62 !important', 
  },
  threadFavoriteIconColor: {
    color: '#000000 !important', 
    padding: '0px !important',
  },
  favoriteStar: {},//f4424b
  scrollableContainer: {
    maxHeight: '300px',
    // maxHeight: '80vh',
    overflowY: 'auto',
    padding: '0 !important',

  },
  container: {
    // position: 'absolute',
    // position: 'relative',
    // display: 'flex',
    // flexDirection: 'row',
    bottom: 0,
    left: 0,  // Ensure it starts from the left
    // width: '100%',
    height: '300px',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: '#ffffff',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  },
  minimized: {
    transform: 'translateY(280px)',
    // transform: 'translateY(calc(+75%))',
  },
  expanded: {
    transform: 'translateY(0)',
  },
  tabButton: {
    cursor: 'pointer',
    position: 'absolute',
    // top: '-30px',
    bottom: '100%',
    left: '50%',
    // transform: 'translateX(-102%)',
    // transform: 'translateX(-50%) translateY(-10px)',
    // backgroundColor: '#007bff',
    backgroundColor: '#f43841',
    color: '#ffffff',
    // color: 'red',
    padding: '10px',
    borderRadius: '5px 5px 0 0',
    zIndex: 15,
  },
  tabButtonLeft: {
    transform: 'translateX(-102%)',
  },
  tabButtonRight: {
    transform: 'translateX(0%)',
  },
  tabButtonChosen: {
    backgroundColor: '#ffffff',
    color: '#f43841',
    borderTop: '1.5px solid #f43841',
    borderLeft: '1.5px solid #f43841',
    borderRight: '1.5px solid #f43841',
    outlineOffset: '5px',
    borderRadius: '5px 5px 0 0',
    zIndex: 15,
  },
  tabButtonNotChosen: {
    backgroundColor: '#f43841',
    color: '#ffffff',
    borderRadius: '5px 5px 0 0',
    zIndex: 15,
  },
  scrollableContainerExpandable: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '20px',
  },
  headerDiv: {
    maxWidth: 720,
    alignItems: 'center',
    // display: 'flex',
    // justifyContent: 'center',
  },
  favFlights: {
    color: '#28282b', 
    // textAlign: 'left',
    // maxWidth: 600,
  }
});

const FlightLegDetails = ({ leg }) => {
  const classes = useStyles();
  const IATACodes = {'TZ': 'ATA Airlines', 'SU': 'Aeroflot Russian International Airlines', 'AC': 'Air Canada', 'CA': 'Air China', 'AF': 'Air France', 'AS': 'Alaska Airlines', 'AZ': 'Alitalia Airlines', 'NH': 'All Nippon Company Airways, Ltd.', 'AA': 'American Airlines', 'OZ': 'Asiana Airlines', 'BA': 'British Airways', 'CP': 'Canadian Airlines', 'PT': 'Capital Cargo International Airlines', 'CV': 'Cargolux Airlines', 'CX': 'Cathay Pacific', 'CI': 'China Airlines', 'DL': 'Delta Air Lines', 'BR': 'EVA Airways', 'EZ': 'Evergreen International Airlines', 'EO': 'Express One International', 'FX': 'Federal Express', 'AY': 'Finnair', 'F9': 'Frontier Airlines', 'HA': 'Hawaiian Airlines', 'JL': 'Japan Airlines', 'KL': 'KLM Royal Dutch Airlines', 'KR': 'Kitty Hawk Air Cargo', 'KE': 'Korean Air Lines', 'LH': 'Lufthansa German Airlines', 'MP': 'Martinair Holland', 'MX': 'Mexicana Airlines', 'YX': 'Midwest Airlines', 'KZ': 'Nippon Cargo Airlines', 'NW': 'Northwest Airlines (became Delta)', 'PR': 'Philippine Airlines', 'QQ': 'Reno Air', 'SQ': 'Singapore Airlines', 'UA': 'United Airlines - Pre 07/01/2013', 'WN': 'Southwest Airlines', 'SY': 'Sun Country Airlines', 'SR': 'Swissair', 'TA': 'TACA International Airlines, S.A.', 'TW': 'TWA', 'FF': 'Tower Air', 'US': 'US Airways', 'VS': 'Virgin Atlantic', 'N7': 'National Airlines', 'GR': 'Gemini Air Cargo', 'WI': 'Tradewinds Airlines', 'K4': 'Kalitta Air', 'NJ': 'Vanguard Airlines', 'A8': 'Ameriflight', 'WO': 'World Airways', 'JW': 'Arrow Air', 'CK': 'China Cargo Airlines', 'UJ': 'Active Aero Charter', 'ER': 'Astar Air Cargo', 'NZ': 'Air New Zealand', 'GB': 'ABX Air', '9S': 'Southern Air', 'FI': 'Icelandair', 'QF': 'Qantas Airways', 'B6': 'JetBlue Airways', 'EI': 'Aer Lingus, Ltd.', 'VX': 'Virgin America', '9W': 'Jet Airways', 'EK': 'Emirates', 'AM': 'Aeromexico', '2Q': 'Air Cargo Carriers', 'AB': 'Air Berlin', 'RW': 'Republic Airlines', 'LX': 'Swiss International', 'LP': 'LAN Peru', '5Y': 'Atlas Air, Inc', 'MU': 'China Eastern', 'SK': 'SAS Airlines', 'EY': 'Etihad Airways', '5X': 'United Parcel Service CO', 'CZ': 'China Southern', 'TK': 'Turkish Airlines', 'CM': 'COPA Airlines, Inc.', 'AI': 'Air India Limited', 'FJ': 'Air Pacific Limited dba Fiji Airways', 'bxr': 'Redding Aero Enterprises', 'WW': 'WOW Air', 'HX': 'Hong Kong Airlines Limited', 'IB': 'Iberia', 'MT': 'Thomas Cook Airlines', 'BF': 'French Bee', 'LY': 'Norwegian Air UK Ltd', 'TP': 'TAP Air Portugal', '8C': 'Air Transport International, Inc.', 'QR': 'Qatar Airways', 'VN': 'Vietnam Airlines JSC', 'DE': 'Condor Flugdienst GmbH', '2I': '21 Air, LLC', 'ZG': 'ZIPAIR Tokyo Inc', 'Z0': 'Norse Atlantic UK, Ltd.', 'JX': 'Starlux Airlines Co. LTD'};

  const formatTime = (dateStr) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleTimeString([], options);
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString([], options);
  };

  // variant="outlined"
  return (
    <Card variant="outlined" className={classes.flightLegCard} elevation={0} > 
      <CardContent className={classes.flightLegCardContent}>
        <Grid container spacing={2} className={classes.flightLegGrid1}>
          <Grid item xs={12} sm={9} className={classes.flightLegGrid2}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="div" className={classes.flightLegTime}>
                {formatTime(leg.local_departure)} &bull; {leg.airport_from} 
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary" className={classes.flightLegDuration}>
              Travel time: {Math.floor((new Date(leg.local_arrival) - new Date(leg.local_departure)) / 3600000)} hr{' '}
              {Math.floor(((new Date(leg.local_arrival) - new Date(leg.local_departure)) % 3600000) / 60000)} min
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="div" className={classes.flightLegTime}>
                {formatTime(leg.local_arrival)} &bull; {leg.airport_to}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}  className={classes.flightLegGrid3}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
            {/* <Box display="flex" flexDirection="column" alignItems="flex-end"> */}
              <Box display="flex" alignItems="center" className={classes.flightLegRightBox}>
                <Typography variant="caption" color="textSecondary" ml={1}>
                  {IATACodes[leg.airline]}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="caption" color="textSecondary" ml={1}>
                {leg.airline} {leg.flight_number}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="caption" color="textSecondary" ml={1}>
                  Economy
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 


const FlightSummary = ({ flightData, toggleExpand, isExpanded, isUserFavorite, setIsUserFavorite, handleUserFavoriteClick, isThreadFavorite, handleThreadFavoriteClick }) => {
    const classes = useStyles();
    // console.log('flightSummary.flightData', flightData);
//   const handleUserFavoriteClick = () => {
//     setIsUserFavorite(!isUserFavorite);
//   };
    var flight_data = {}
    if ('flight_data' in flightData) {
        flight_data = flightData.flight_data;
    } else {
        flight_data = flightData;
    }
    // console.log('flightSummary.flight_data', flight_data);


    const formatTimeRange = (departure, arrival) => {
        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        // const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const dateOptions = { month: 'short', day: 'numeric' };
        const departureDate = new Date(departure).toLocaleDateString([], dateOptions);
        const departureTime = new Date(departure).toLocaleTimeString([], timeOptions);
        const arrivalTime = new Date(arrival).toLocaleTimeString([], timeOptions);
        return `${departureDate}, ${departureTime} – ${arrivalTime}`;
    };

    const formatDate = (dateStr) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString([], options);
    };

    const calculateLayover = (arrival, departure) => {
        const layoverTime = new Date(departure) - new Date(arrival);
        return {
        hours: Math.floor(layoverTime / 3600000),
        minutes: Math.floor((layoverTime % 3600000) / 60000),
        };
    };

    const calculateDuration = (departure, arrival) => {
        const duration = new Date(arrival) - new Date(departure);
        return {
        hours: Math.floor(duration / 3600000),
        minutes: Math.floor((duration % 3600000) / 60000),
        };
    };

    const { hours, minutes } = calculateDuration(flightData.flight_data.local_departure, flightData.flight_data.local_arrival);

    return (
        <Card variant="outlined" className={classes.flightDetails}>
            <CardContent className={classes.flightSummaryCardContent}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box className={classes.userFavorite} display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="caption" style={{ fontSize: '10px' }}>user</Typography>
                            <IconButton onClick={handleUserFavoriteClick} className={classes.userFavoriteIconColor}>
                                {isUserFavorite ? (
                                    <StarIcon className={classes.userFavoriteIcon} style={{ color: 'black' }}/>
                                ) : (
                                    <StarBorderIcon className={classes.iconColor}/>
                                )}
                            </IconButton>
                        </Box>
                        <Box className={classes.threadFavorite} display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="caption" style={{ fontSize: '10px' }}>chat</Typography>
                            <IconButton onClick={handleThreadFavoriteClick} className={classes.threadFavoriteIconColor}>
                                {isThreadFavorite ? (
                                    <StarIcon className={classes.threadFavoriteIcon} style={{ color: '#f4424b' }}/>
                                ) : (
                                    <StarBorderIcon className={classes.iconColor}/>
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                    {/* <Box display="flex" alignItems="center" mt={1}>
                        <IconButton onClick={handleUserFavoriteClick} className={classes.userFavoriteIconColor}>
                            {isUserFavorite ? (
                                <StarIcon className={classes.userFavoriteIcon} style={{ color: 'black' }}/>
                            ) : (
                                <StarBorderIcon  className={classes.iconColor}/>
                            )}
                        </IconButton>
                        <IconButton onClick={handleThreadFavoriteClick} className={classes.threadFavoriteIconColor}>
                            {isThreadFavorite ? (
                                <StarIcon className={classes.threadFavoriteIcon} style={{ color: '#f4424b' }}/>
                            ) : (
                                <StarBorderIcon  className={classes.iconColor}/>
                            )}
                        </IconButton>
                    </Box> */}
                    <Box>
                        <Typography variant="body1" className={classes.flightHeader}>
                        {formatTimeRange(flightData.flight_data.local_departure, flight_data.local_arrival)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                        American
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" className={classes.flightHeader}>
                        {hours} hr {minutes} min
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                        {flight_data.origin}–{flight_data.destination}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" className={classes.flightHeader}>
                        {flight_data.outbound_legs.length - 1} stop{flight_data.outbound_legs.length > 2 ? 's' : ''}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                        {flight_data.outbound_legs.length === 2
                            ? `${calculateLayover(flight_data.outbound_legs[0].local_arrival, flight_data.outbound_legs[1].local_departure).hours} hr ${calculateLayover(flight_data.outbound_legs[0].local_arrival, flight_data.outbound_legs[1].local_departure).minutes} min ${flight_data.outbound_legs[1].airport_from}`
                            : flight_data.outbound_legs.slice(1).map(leg => leg.airport_from).join(', ')}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" className={classes.price}>
                        ${flight_data.price}
                        </Typography>
                    </Box>
                    <IconButton onClick={toggleExpand}>
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

const FlightHeaders = () => {
    const classes = useStyles();
    return (
        <CardContent className={classes.flightSummaryCardContent}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* <Box display="flex" className={classes.favoriteStar} alignItems="center" mt={1}>
                    </Box> */}
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="body2" className={classes.flightHeader}>
                            user_fav
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" className={classes.flightHeader}>
                            thread_fav
                        </Typography>
                    </Box>
                    <Box>
                        {/* <Typography variant="body2" className={classes.flightHeader}>
                            user_fav
                        </Typography> */}
                    </Box>
                    <Box>
                        {/* <Typography variant="body2" className={classes.flightHeader}>
                            user_fav
                        </Typography> */}
                    </Box>
                    <Box>
                        {/* <Typography variant="body2" className={classes.flightHeader}>
                            user_fav
                        </Typography> */}
                    </Box>
                </Box>
            </CardContent>
    )
};


const FlightDetails = ({ flightData, toggleExpand, threadFlightData, setThreadFlightData, setFavoriteFlightData }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);
    // const [isUserFavorite, setIsUserFavorite] = useState(false);
    // const [isThreadFavorite, setIsThreadFavorite] = useState(false);
    const [isUserFavorite, setIsUserFavorite] = useState(flightData.user_fav || false);
    const [isThreadFavorite, setIsThreadFavorite] = useState(flightData.thread_fav || false);

    const handleUserFavoriteClick = async () => {
        const newFavoriteStatus = !isUserFavorite;
        setIsUserFavorite(newFavoriteStatus);
        try {
            const response = await fetch('https://api.base3ai.net/travel/database/user/favorite_flights', {
                method: 'PUT',
                body: JSON.stringify({
                    user_id: flightData.user_id,
                    thread_id: flightData.thread_id,
                    kiwi_id: flightData.kiwi_id,
                    fav_type: 'user_fav',
                    is_favorite: newFavoriteStatus,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) { 
                console.log(response)
                throw new Error('Failed to fetch chat history') }
            console.log(response.json().data); // Log or handle response data as needed

            const updateUserFavoriteFlight = (user_id, kiwi_id, newFavoriteStatus) => {
                setThreadFlightData(threadFlightData => 
                    threadFlightData.map(flight => {
                        if (flight.user_id === user_id && flight.kiwi_id === kiwi_id) {
                            return { ...flight, user_fav: newFavoriteStatus };
                        }
                        return flight;
                    })
                );
                setFavoriteFlightData(favoriteFlightData => {
                    const flightExists = favoriteFlightData.some(flight => flight.user_id === user_id && flight.kiwi_id === kiwi_id);
            
                    if (flightExists) {  // If the flight exists, filter it out (remove it)
                        return favoriteFlightData.filter(flight => !(flight.user_id === user_id && flight.kiwi_id === kiwi_id));
                    } else {  // If the flight does not exist, add it
                        flightData.user_fav =  newFavoriteStatus
                        return [...favoriteFlightData, flightData];
                    }
                });
            };
            const updatedData = updateUserFavoriteFlight(flightData.user_id, flightData.kiwi_id, newFavoriteStatus)

        } catch (error) {
            console.error('Failed to update user favorite status', error);
            setIsUserFavorite(isUserFavorite); // Revert the state on error
        }
    };

    const handleThreadFavoriteClick = async () => {
        const newFavoriteStatus = !isThreadFavorite;
        setIsThreadFavorite(newFavoriteStatus);
        try {
            const response = await fetch('https://api.base3ai.net/travel/database/user/favorite_flights', {
                method: 'PUT',
                body: JSON.stringify({
                    user_id: flightData.user_id,
                    thread_id: flightData.thread_id,
                    kiwi_id: flightData.kiwi_id,
                    fav_type: 'thread_fav',
                    is_favorite: newFavoriteStatus,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) { 
                console.log(response)
                throw new Error('Failed to fetch chat history') }
            console.log(response.json().data); // Log or handle response data as needed

            const updateThreadFavoriteFlight = (user_id, thread_id, kiwi_id, newFavoriteStatus) => {
                setThreadFlightData(threadFlightData => 
                    threadFlightData.map(flight => {
                        if (flight.user_id === user_id && flight.thread_id === thread_id && flight.kiwi_id === kiwi_id) {
                            return { ...flight, thread_fav: newFavoriteStatus };
                        }
                        return flight;
                    })
                );
                setFavoriteFlightData(favoriteFlightData => {
                    const flightExists = favoriteFlightData.some(flight => flight.user_id === user_id && flight.thread_id === thread_id && flight.kiwi_id === kiwi_id);
            
                    if (flightExists) {  // If the flight exists, filter it out (remove it)
                        return favoriteFlightData.filter(flight => !(flight.user_id === user_id && flight.thread_id === thread_id && flight.kiwi_id === kiwi_id));
                    } else {  // If the flight does not exist, add it
                        flightData.thread_fav =  newFavoriteStatus
                        return [...favoriteFlightData, flightData];
                    }
                });
            };
            const updatedData = updateThreadFavoriteFlight(flightData.user_id, flightData.thread_id, flightData.kiwi_id, newFavoriteStatus)

        } catch (error) {
            console.error('Failed to update thread favorite status', error);
            setIsThreadFavorite(isThreadFavorite); // Revert the state on error
        }
    };


    const formatDateToDay = (dateStr) => {
        const date = new Date(dateStr);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const formatDate = (dateStr) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString([], options);
    };

    const calculateLayover = (arrival, departure) => {
        const layoverTime = new Date(departure) - new Date(arrival);
        return {
        hours: Math.floor(layoverTime / 3600000),
        minutes: Math.floor((layoverTime % 3600000) / 60000),
        };
    };

    return (
        <Box>
            <FlightSummary 
                flightData={flightData} 
                toggleExpand={toggleExpand} 
                isExpanded={isExpanded} 
                isUserFavorite={isUserFavorite} 
                setIsUserFavorite={setIsUserFavorite}
                handleUserFavoriteClick={handleUserFavoriteClick}
                isThreadFavorite={isThreadFavorite}
                handleThreadFavoriteClick={handleThreadFavoriteClick}
            />
            {isExpanded && (
                <Card variant="outlined" className={classes.flightDetails}>
                {/* <CardContent>
                    <div className={classes.header}>
                    <Typography variant="body1" component="div" className={classes.flightHeader} gutterBottom>
                        Departure &bull; {formatDate(flightData.local_departure)}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" className={classes.price}>
                        ${flightData.price}
                        </Typography>
                        <Button variant="contained" color="primary" className={classes.selectButton}>
                        Favorite flight
                        </Button>
                    </Box>
                    </div>
                </CardContent> */}
                {flightData.outbound_legs.map((leg, index) => (
                    <Box key={index}>
                    <FlightLegDetails leg={leg} />
                    {index < flightData.outbound_legs.length - 1 && (
                        <div className={classes.flightLayoverDuration}>
                            <Box display="flex" alignItems="center" className={classes.flightLayoverDuration}>
                                <Typography variant="caption" color="textSecondary">
                                    Layover: {calculateLayover(leg.local_arrival, flightData.outbound_legs[index + 1].local_departure).hours} hr {calculateLayover(leg.local_arrival, flightData.outbound_legs[index + 1].local_departure).minutes} min
                                </Typography>
                            </Box>
                        </div>
                    )}
                    </Box>
                ))}
                </Card>
            )}
        </Box>
    );
    };

// const FlightDetails = ({ flightData, toggleExpand, threadFlightData, setThreadFlightData, setFavoriteFlightData }) => {

// export const FlightsTableExpandable = ({ flightDataArr, threadFavoriteFlightDataArr }) => {
const FlightsTable = ({flightDataArr, threadFlightData, setThreadFlightData, setFavoriteFlightData}) => {
    const classes = useStyles();
    console.log('FlightsTable.flightDataArr', flightDataArr);
    // console.log('FlightsTable.threadFlightData', threadFlightData);
    return (
        <div style={{ padding: '20px' }} className={classes.scrollableContainer}>
            {flightDataArr.map((flightData, index) => (
                <FlightDetails 
                    key={index} 
                    flightData={flightData} 
                    // threadFlightData={threadFlightData} 
                    setThreadFlightData={setThreadFlightData}
                    setFavoriteFlightData={setFavoriteFlightData}
                />
            ))}
        </div>
    );
};

export default FlightsTable;





// export const FlightsTableExpandable = ({ flightDataArr }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const classes = useStyles();

//     const toggleExpand = () => {
//         setIsExpanded(!isExpanded);
//         const chatHistory = document.querySelector('.travel-gpt-main-chat-history');
//         if (isExpanded) {
//           chatHistory.style.flexGrow = '1'; // Return to normal size when not expanded
//         } else {
//           chatHistory.style.flexGrow = '0'; // Minimize to give more space to the expandable area
//         }
//     };
//     return (
//     <div className={`${classes.container} ${isExpanded ? classes.expanded : classes.minimized}`}>
//         <div className={classes.tabButton} onClick={toggleExpand}>
//             {isExpanded ? 'Minimize' : 'Expand Favorite Flights'}
//         </div>
//         <div>
//             <div className={classes.headerDiv}>
//                 <div className={classes.favFlights}>Favorite Flights</div>
//             </div>
//             <div className={`${classes.scrollableContainerExpandable} ${isExpanded ? 'expanded' : ''}`}>
//                 {flightDataArr.map((flightData, index) => (
//                     <FlightDetails key={index} flightData={flightData} />
//                 ))}
//             </div>
//         </div>
//     </div>
//     );
// };
  

export const FlightsTableExpandable = ({ flightDataArr, threadFlightData, setThreadFlightData, setFavoriteFlightData}) => {
    // console.log('flightDataArr',flightDataArr,);
    // console.log('threadFlightData',threadFlightData,);
    
    const [isExpandedUserFavorites, setIsExpandedUserFavorites] = useState(false);
    const [isExpandedThreadFavorites, setIsExpandedThreadFavorites] = useState(false);
    const classes = useStyles();
  
    const toggleExpandUserFavorites = () => {
        console.log('toggleExpandUserFavorites.isExpandedUserFavorites',isExpandedUserFavorites,'=>',!isExpandedUserFavorites);
        console.log('isExpandedThreadFavorites',isExpandedThreadFavorites,);
        setIsExpandedUserFavorites(!isExpandedUserFavorites);
        if (!isExpandedUserFavorites) {
            setIsExpandedThreadFavorites(false);
        }
        const chatHistory = document.querySelector('.travel-gpt-main-chat-history');
        if (isExpandedUserFavorites) {
            chatHistory.style.flexGrow = '1';
        } else {
            chatHistory.style.flexGrow = '0';
        }
        };
  
    const toggleExpandThreadFavorites = () => {
        console.log('toggleExpandThreadFavorites.isExpandedThreadFavorites',isExpandedThreadFavorites,'=>',!isExpandedThreadFavorites);
        console.log('isExpandedUserFavorites',isExpandedUserFavorites,);
        setIsExpandedThreadFavorites(!isExpandedThreadFavorites);
        if (!isExpandedThreadFavorites) {
            setIsExpandedUserFavorites(false);
        }
        const chatHistory = document.querySelector('.travel-gpt-main-chat-history');
        if (isExpandedThreadFavorites) {
            chatHistory.style.flexGrow = '1';
        } else {
            chatHistory.style.flexGrow = '0';
        }
        };
  
    return (
        <div className={`${classes.container} ${(isExpandedUserFavorites || isExpandedThreadFavorites) ? classes.expanded : classes.minimized}`}>
            {/* <div className={classes.tabButton} onClick={toggleExpandUserFavorites}> */}
            <div className={`${classes.tabButton} ${classes.tabButtonLeft} ${isExpandedUserFavorites ? classes.tabButtonChosen : classes.tabButtonNotChosen}`} onClick={toggleExpandUserFavorites}>
                {isExpandedUserFavorites ? 'User Favorites' : 'User Favorites'}
            </div>
            {/* <div className={classes.tabButtonThreadFavorites} onClick={toggleExpandThreadFavorites}> */}
            <div className={`${classes.tabButton} ${classes.tabButtonRight} ${isExpandedThreadFavorites ? classes.tabButtonChosen : classes.tabButtonNotChosen}`} onClick={toggleExpandThreadFavorites}>
                {isExpandedThreadFavorites ? 'Thread Favorites' : 'Thread Favorites'}
            </div>
            <div>
            {isExpandedUserFavorites && (
                <div className={`${classes.scrollableContainerExpandable} expanded`}>
                    <div className={classes.headerDiv}>
                        <div className={classes.favFlights}>User Favorite Flights</div>
                    </div>
                {flightDataArr.map((flightData, index) => (
                    <FlightDetails 
                        key={index} 
                        flightData={flightData}
                        setThreadFlightData={setThreadFlightData}
                        setFavoriteFlightData={setFavoriteFlightData}
                    />
                ))}
                </div>
            )}
            {isExpandedThreadFavorites && (
                <div className={`${classes.scrollableContainerExpandable} expanded`}>
                    <div className={classes.headerDiv}>
                        <div className={classes.favFlights}>Thread Favorite Flights</div>
                    </div>
                {threadFlightData.filter(flightData => flightData.thread_fav).map((flightData, index) => (
                    // <FlightDetails key={index} flightData={flightData} />
                    <FlightDetails 
                        key={index} 
                        flightData={flightData}
                        setThreadFlightData={setThreadFlightData}
                        setFavoriteFlightData={setFavoriteFlightData}
                    />
                ))}
                </div>
            )}
            </div>
        </div>
    );
};