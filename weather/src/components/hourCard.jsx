import { Fragment, useEffect, useState } from 'react';
import { imageMap } from '../Home/Home';

import './hourCard.css';

const HourCard = ({ latitude, longtitude }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    fetch(
      `https://weerlive.nl/api/weerlive_api_v2.php?key=${import.meta.env.VITE_WEATHER_APP_API_KEY}&locatie=${latitude},${longtitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.uur_verw) {
          const formattedData = data.uur_verw.map((item) => ({
            time: item.uur.substring(11),
            temp: `${item.temp}°`,
            icon: imageMap[item.image],
            image: item.image,
          }));

          if (data && data.wk_verw) {
            const formattedWeekData = data.wk_verw.map((item) => ({
              day: item.dag.substring(0, 5),
              tempMax: item.max_temp,
              tempMin: item.min_temp,
              icon: imageMap[item.image],
            }));
            setWeekData(formattedWeekData);
          }
          // formattedData.forEach((item) => console.log(item.image));
          setHourlyData(formattedData);
        }
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <Fragment>
      <div className='tilesContainer'>
        <div className='tiles'>
          {hourlyData.map((data, index) => (
            <div className='hourCard' key={index}>
              <p>{data.time}</p>
              <img src={data.icon} alt='Weather Icon' />
              <h2>{data.temp}</h2>
            </div>
          ))}
        </div>
        <div className='tiles'>
          <div className='daysContainer'>
            {weekData.map((data, index) => (
              <div className='hourCard' key={index}>
                <p>{data.day}</p>
                <img src={data.icon} alt='Weather Icon' />
                <div className='minMax'>
                  <p>max</p>
                  <h2>{data.tempMax}°</h2>
                </div>
                <div className='minMax'>
                  <p>min</p>
                  <h2>{data.tempMin}°</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HourCard;
