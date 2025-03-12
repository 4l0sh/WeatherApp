import { Fragment, useEffect, useState } from 'react';
import Cloud from '../assets/cloudy.svg';
import './hourCard.css';

const HourCard = () => {
  const hourlyData = [
    { time: '12:45', temp: '4°', icon: Cloud },
    { time: '13:45', temp: '9°', icon: Cloud },
    { time: '14:45', temp: '10°', icon: Cloud },
    { time: '15:45', temp: '11°', icon: Cloud },
    { time: '16:45', temp: '12°', icon: Cloud },
    { time: '17:45', temp: '13°', icon: Cloud },
    { time: '18:45', temp: '14°', icon: Cloud },
    { time: '19:45', temp: '15°', icon: Cloud },
    { time: '20:45', temp: '16°', icon: Cloud },
  ];

  useEffect(() => {
    fetch(
      'https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam',
      {
        method: 'GET',
      }
    ).then((response) => {
      response.json().then((data) => {
        console.log(data.liveweer);
      });
    });
  }, []);

  return (
    <Fragment>
      {hourlyData.map((data, index) => (
        <div className='hourCard' key={index}>
          <p>{data.time}</p>
          <img src={data.icon} alt='Weather Icon' />
          <h2>{data.temp}</h2>
        </div>
      ))}
    </Fragment>
  );
};

export default HourCard;
