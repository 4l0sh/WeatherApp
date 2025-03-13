import { Fragment, useEffect, useState } from 'react';
import { imageMap } from '../Home/Home';
import Cloud from '../assets/lightCloudy.svg';

import './hourCard.css';

const HourCard = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [image, setImage] = useState(Cloud);

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
            icon: imageMap[item.image],
            image: item.image,
          }));
          formattedData.forEach((item) => console.log(item.image));
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
