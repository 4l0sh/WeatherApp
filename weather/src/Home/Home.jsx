import React, { Fragment, useEffect, useState, useRef } from 'react';
import Cloudy from '../assets/cloudy.svg';
import SlightlyCloudy from '../assets/lightCloudy.svg';
import CloudyDay from '../assets/cloudy-day-3.svg';
import CloudyNight from '../assets/cloudy-night-3.svg';
import Day from '../assets/day.svg';
import Night from '../assets/night.svg';
import Rain from '../assets/rainy-3.svg';
import Snow from '../assets/snowy-1.svg';
import HourCard from '../components/hourCard';
import './Home.css';

export const imageMap = {
  lichtbewolkt: CloudyDay,
  zonnig: Day,
  regen: Rain,
  sneeuw: Snow,
  helderenacht: Night,
  halfbewolkt: SlightlyCloudy,
  bewolkt: Cloudy,
  zwaarbewolkt: Cloudy,
  nachtbewolkt: CloudyNight,
};

const Home = () => {
  const [currTemp, setCurrTemp] = useState(0);
  const [location, setLocation] = useState('Amsterdam');
  const [samenv, setSamenv] = useState('');
  const [image, setImage] = useState(Cloudy);
  const [isLocated, setIsLocated] = useState(false);
  const userLatitude = useRef(0);
  const userLongtitude = useRef(0);

  useEffect(() => {
    const clock = document.getElementById('clock');
    const updateClock = () => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      clock.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };
    updateClock();
    setInterval(updateClock, 1000);

    fetch(
      `https://weerlive.nl/api/weerlive_api_v2.php?key=${import.meta.env.VITE_WEATHER_APP_API_KEY}&locatie=${userLatitude.current},${userLongtitude.current}`,
      {
        method: 'GET',
      }
    ).then((response) => {
      response.json().then((data) => {
        setCurrTemp(data.liveweer[0].temp);
        setLocation(data.liveweer[0].plaats);
        setSamenv(data.liveweer[0].samenv);
        setImage(imageMap[data.liveweer[0].image]);
      });
    });
  }),
    [];

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      userLatitude.current = position.coords.latitude;
      userLongtitude.current = position.coords.longitude;

      console.log(
        'Latitude is : ',
        userLatitude.current,
        'Longitude is : ',
        userLongtitude.current
      );
      setIsLocated(true);
    });
  };
  return (
    <Fragment>
      <div className='homeContainer'>
        <div className='topBar'>
          <h1 className='location'>📌 {location}</h1>
          <h1 className='location' id='clock'>
            11:30
          </h1>
        </div>
        <div className='mainContent'>
          {isLocated ? null : (
            <div className='getLocation'>
              <h1>Give Premission to get Location</h1>
              <button onClick={getLocation}>Get Location</button>
            </div>
          )}
          <div className='currentWeather'>
            <img className='currentWeatherIcon' src={image} alt='Cloud' />
            <h3>{samenv}</h3>
            <p className='temp'>{currTemp}°</p>
          </div>
        </div>
        <div className='Hourly'>
          <div className='hoursCardsContainer'>
            <HourCard />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
