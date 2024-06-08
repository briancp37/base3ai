import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
// import { config } from 'dotenv';

import mapStyles from '../../pages/LocalGPTPage/mapStyles';
import useStyles from './styles.js';

// config();
// require('dotenv').config();

// const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {

// const GM_API_K = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log("GM_API_K: ", GM_API_K);


const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  console.log('mathces: ', matches);
//   console.log('places: ', places);
//   console.log('places.length: ', places.length);
//   console.log('coords: ', coords);
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        // bootstrapURLKeys={{ key: "AIzaSyBUIqmXadsQ7uQ3VCmYqlmMWjp3H96vVoU" }}
        defaultCenter={{ lat: 30.259848, long: -97.75475}}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={{ zoomControl: true, styles: mapStyles }}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
         {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;