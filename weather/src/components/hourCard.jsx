import { Fragment, useEffect, useState } from 'react';
import Cloud from '../assets/cloudy.svg';
import halfbewolkt from '../assets/cloud.svg';
import './hourCard.css';

const HourCard = () => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    fetch(
      'https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.uur_verw) {
          const formattedData = data.uur_verw.map((item) => ({
            time: item.uur.substring(11),
            temp: `${item.temp}°`,
            icon: Cloud,
            image: item.image,
          }));
          // formattedData.forEach((item) => console.log(item.image));
          const firstImage = formattedData[0].image;
          console.log(firstImage);
          setHourlyData(formattedData);
        }
      })
      .catch((error) => console.error('Error fetching weather data:', error));
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
