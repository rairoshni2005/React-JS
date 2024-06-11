import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = '8a0076deadd5be662947d91622e82670';

    async function fetchData() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        try {
            let response = await fetch(url);
            if (response.ok) {
                let data = await response.json();
                console.log("Weather data:", data); 
                setWeather(data);
                setError('');
            } else if (response.status === 404) {
                setError('City not found');
                setWeather(null);
            } else {
                const errorMessage = await response.text();
                setError(`Error: ${errorMessage}`);
                setWeather(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Error fetching data. Please try again later.');
            setWeather(null);
        }
    }

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    return (
        <div className='container'>
            <div className='city'>
                <input
                    type="text" value={city} onChange={handleOnChange} placeholder='Enter City Name' />
                <button onClick={fetchData}>
                    <FaSearch />
                </button>
            </div>
            {error && <p className='error-message'>{error}</p>}
            {weather && weather.weather && (
                <div className='content'>
                    <div className='weather-image'>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt='weather icon'
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                        />
                        <h3 className='desc'>{weather.weather[0].description}</h3>
                    </div>
                    <div className='weather-temp'>
                        <h2>{weather.main.temp}<span>&deg;C</span></h2>
                    </div>
                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn />
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>
                    <div className='weather-stats'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind />
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed}<span>Km/hr</span></h3>
                            <h3 className='wind-heading'> Wind Speed </h3>
                        </div>
                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity />
                            </div>
                            <h3 className='humidity-percent'>{weather.main.humidity} <span>%</span></h3>
                            <h3 className='humidity-heading'>Humidity </h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
