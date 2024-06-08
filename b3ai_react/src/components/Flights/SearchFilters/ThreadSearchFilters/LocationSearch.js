import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, TextField, CircularProgress } from '@mui/material';

const debouncedFunction = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const LocationSearch = ({ flightSearchParams, editFlightSearchParamsArr }) => {
  console.log('LocationSearch.flightSearchParams', flightSearchParams);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleClick = (event) => {
      event.stopPropagation();
  };

  const fetchOptions = async (query) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://api.example.com/locations?query=${query}`);
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchOptions = debouncedFunction(fetchOptions, 1000);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchOptions(inputValue);
    }
  }, [inputValue]);

  return (
    <Box>
    <Autocomplete
      freeSolo
      fullWidth
      options={options}
      onClick={handleClick}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search location"
          variant="outlined"
          fullWidth
          onClick={handleClick}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
    </Box>
  );
};

export default LocationSearch;
