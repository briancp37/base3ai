import React, { useState } from 'react';
import './FlightSearchFilters.css'; // Ensure you create this CSS file for styling

const FlightSearchFilters = ({
  stops, setStops,
  selectedAirlines, setSelectedAirlines,
  selectAllAirlines, setSelectAllAirlines,
  carryOnBag, setCarryOnBag,
  price, setPrice,
  outboundTime, setOutboundTime,
  returnTime, setReturnTime,
  layoverDuration, setLayoverDuration,
  connectingAirports, setConnectingAirports,
  allConnectingAirports, setAllConnectingAirports,
  flightDuration, setFlightDuration,
  closeFilters
}) => {


  const airlines = [
    'Aer Lingus', 'Aeromexico', 'Air Canada', 'Air France', 'Air Tahiti Nui',
    'Alaska', 'American', 'Austrian', 'British Airways'
  ];

  const handleStopChange = (event) => {
    setStops(event.target.value);
  };

  const handleAirlineChange = (event) => {
    const value = event.target.value;
    setSelectedAirlines(
      selectedAirlines.includes(value)
        ? selectedAirlines.filter(airline => airline !== value)
        : [...selectedAirlines, value]
    );
  };

  const handleSelectAllAirlines = () => {
    setSelectAllAirlines(!selectAllAirlines);
    setSelectedAirlines(selectAllAirlines ? [] : airlines);
  };

  const handleBagChange = (amount) => {
    setCarryOnBag(prev => Math.max(0, prev + amount));
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTimeChange = (event, type) => {
    if (type === 'outbound') {
      setOutboundTime(event.target.value);
    } else {
      setReturnTime(event.target.value);
    }
  };

  const handleLayoverDurationChange = (event) => {
    setLayoverDuration(event.target.value);
  };

  const handleConnectingAirportChange = (event) => {
    const value = event.target.value;
    setConnectingAirports(
      connectingAirports.includes(value)
        ? connectingAirports.filter(airport => airport !== value)
        : [...connectingAirports, value]
    );
  };

  const handleSelectAllConnectingAirports = () => {
    setAllConnectingAirports(!allConnectingAirports);
    setConnectingAirports(allConnectingAirports ? [] : []);
  };

  const handleFlightDurationChange = (event) => {
    setFlightDuration(event.target.value);
  };

  return (
    <div className="filters">
      {/* <div className="filters-header">
        <h3>Filters</h3>
        <button className="close-button" onClick={closeFilters}>x</button>
        <button className="close-button" onClick={() => setStops('')}>x</button>
      </div> */}

      <div className="filters-section">
        <h4>Stops</h4>
        <div className="filters-stops">
          <label className="filter-option">
            <input
              type="radio"
              value="any"
              checked={stops === 'any'}
              onChange={handleStopChange}
            />
            Any number of stops
          </label>
          <label className="filter-option">
            <input
              type="radio"
              value="nonstop"
              checked={stops === 'nonstop'}
              onChange={handleStopChange}
            />
            Nonstop only
          </label>
          <label className="filter-option">
            <input
              type="radio"
              value="oneOrFewer"
              checked={stops === 'oneOrFewer'}
              onChange={handleStopChange}
            />
            1 stop or fewer
          </label>
          <label className="filter-option">
            <input
              type="radio"
              value="twoOrFewer"
              checked={stops === 'twoOrFewer'}
              onChange={handleStopChange}
            />
            2 stops or fewer
          </label>
        </div>
      </div>






      <div className="filters-section">
        <h4>Airlines</h4>
        <div className="filters-airlines">
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectAllAirlines}
              onChange={handleSelectAllAirlines}
            />
             Select all airlines
          </label>
          {airlines.map(airline => (
            <label key={airline}>
              <input
                type="checkbox"
                value={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={handleAirlineChange}
              />
              {airline}
            </label>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <h4>Bags</h4>
        <div className="filters-bags">
          <label>Carry-on bag</label>
          <button onClick={() => handleBagChange(-1)}>-</button>
          <span>{carryOnBag}</span>
          <button onClick={() => handleBagChange(1)}>+</button>
        </div>
      </div>

      <div className="filters-section">
        <h4>Price</h4>
        <div className="filters-price">
          <input
            type="range"
            min="0"
            max="2000"
            value={price}
            onChange={handlePriceChange}
          />
          <span>{price}</span>
        </div>
      </div>

      <div className="filters-section">
        <h4>Times</h4>
        <div className="filters-times">
          <div>
            <button>Outbound</button>
            <input
              type="range"
              min="0"
              max="24"
              value={outboundTime}
              onChange={(e) => handleTimeChange(e, 'outbound')}
            />
            <span>{outboundTime} hrs</span>
          </div>
          <div>
            <button>Return</button>
            <input
              type="range"
              min="0"
              max="24"
              value={returnTime}
              onChange={(e) => handleTimeChange(e, 'return')}
            />
            <span>{returnTime} hrs</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <h4>Connecting Airports</h4>
        <div className="filters-layover">
          <label>Layover duration</label>
          <input
            type="range"
            min="0"
            max="10"
            value={layoverDuration}
            onChange={handleLayoverDurationChange}
          />
          <span>{layoverDuration} hrs</span>
        </div>
        <div className="filters-airports">
          <label className="select-all">
            <input
              type="checkbox"
              checked={allConnectingAirports}
              onChange={handleSelectAllConnectingAirports}
            />
            All connecting airports
          </label>
          {['Atlanta (ATL)', 'Boston (BOS)', 'Brussels (BRU)', 'Casablanca (CMN)'].map(airport => (
            <label key={airport}>
              <input
                type="checkbox"
                value={airport}
                checked={connectingAirports.includes(airport)}
                onChange={handleConnectingAirportChange}
              />
              {airport}
            </label>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <h4>Duration</h4>
        <div className="filters-duration">
          <input
            type="range"
            min="0"
            max="20"
            value={flightDuration}
            onChange={handleFlightDurationChange}
          />
          <span>{flightDuration} hrs</span>
        </div>
      </div>

      <div className="filters-footer">
        <button onClick={() => {
          setStops('any');
          setSelectedAirlines([]);
          setSelectAllAirlines(true);
          setCarryOnBag(0);
          setPrice(1000);
          setOutboundTime(0);
          setReturnTime(0);
          setLayoverDuration(0);
          setConnectingAirports([]);
          setAllConnectingAirports(true);
          setFlightDuration(0);
        }}>
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FlightSearchFilters;
