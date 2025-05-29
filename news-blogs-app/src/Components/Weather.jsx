import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        const defaultLocation = 'Rourkela';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=b44f0ac6dc55c3f80646dce29b5acb9d`;
        const response = await axios.get(url);
        setData(response.data);
        setNotFound(false);
      } catch (error) {
        console.error('Default fetch error:', error);
      }
    };
    fetchDefaultLocation();
  }, []);

  const search = async () => {
    if (!location.trim()) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b44f0ac6dc55c3f80646dce29b5acb9d`;
      const response = await axios.get(url);
      setData(response.data);
      setLocation('');
      setNotFound(false);
    } catch (error) {
      setNotFound(true);
      setData({});
      setLocation('');
      console.error('Search error:', error);
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear': return <i className="bx bxs-sun"></i>;
      case 'Clouds': return <i className="bx bxs-cloud"></i>;
      case 'Rain': return <i className="bx bxs-cloud-rain"></i>;
      case 'Snow': return <i className="bx bxs-cloud-snow"></i>;
      case 'Thunderstorm': return <i className="bx bxs-bolt"></i>;
      case 'Haze':
      case 'Mist': return <i className="bx bxs-cloud"></i>;
      default: return <i className="bx bxs-cloud"></i>;
    }
  };
  const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    search();
  }
};

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name || '...'}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      {notFound ? (
        <div className="not-found">Not Found 😢</div>
      ) : (
        data.weather && data.main && (
          <div className="weather-data">
            {getWeatherIcon(data.weather[0].main)}
            <div className="weather-type">{data.weather[0].main}</div>
            <div className="temp">{Math.floor(data.main.temp)}°C</div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;






