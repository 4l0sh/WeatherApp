import React, { Fragment } from 'react';
import Cloud from '../assets/cloud.png';
import HourCard from '../components/hourCard';
import './Home.css';

const Home = () => {
  return (
    <Fragment>
      <div className='homeContainer'>
        <div className='topBar'>
          <h1 className='location'>📌 Location</h1>
          <h1 className='location'>11:30</h1>
        </div>
        <div className='mainContent'>
          <div className='currentWeather'>
            <img className='currentWeatherIcon' src={Cloud} alt='Cloud' />
            <p className='temp'>7°</p>
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
