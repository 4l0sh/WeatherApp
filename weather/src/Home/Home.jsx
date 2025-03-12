import React, { Fragment, useEffect, useState } from 'react';
import Cloud from '../assets/cloudy.svg';
import HourCard from '../components/hourCard';
import './Home.css';

const Home = () => {
  const [currTemp, setCurrTemp] = useState(0);
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
      'https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam',
      {
        method: 'GET',
      }
    ).then((response) => {
      response.json().then((data) => {
        setCurrTemp(data.liveweer[0].temp);
      });
    });
  }),
    [];
  return (
    <Fragment>
      <div className='homeContainer'>
        <div className='topBar'>
          <h1 className='location'>📌 Location</h1>
          <h1 className='location' id='clock'>
            11:30
          </h1>
        </div>
        <div className='mainContent'>
          <div className='currentWeather'>
            <img className='currentWeatherIcon' src={Cloud} alt='Cloud' />
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
