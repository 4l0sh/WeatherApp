import React, { Fragment, useEffect, useState, useRef } from 'react';
import Cloudy from '../assets/cloudy.svg';
import SlightlyCloudy from '../assets/lightCloudy.svg';
import CloudyDay from '../assets/cloudy-day-3.svg';
import CloudyNight from '../assets/cloudy-night-1.svg';
import CloudyNight2 from '../assets/cloudy-night-3.svg';
import Day from '../assets/day.svg';
import Night from '../assets/night.svg';
import Rain from '../assets/rainy-6.svg';
import Snow from '../assets/snowy-1.svg';
import Showers from '../assets/rainy-3.svg';
import HourCard from '../components/hourCard';
import CompassNorth from '../assets/Compass/CompassNorth.png';
import CompassWest from '../assets/Compass/CompassWest.png';
import CompassEast from '../assets/Compass/CompassEast.png';
import CompassSouth from '../assets/Compass/CompassSouth.png';
import NorthWest from '../assets/Compass/NorthWest.png';
import NorthEast from '../assets/Compass/NorthEast.png';
import SouthEast from '../assets/Compass/SouthEast.png';
import SouthWest from '../assets/Compass/SouthWest.png';
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
  wolkennacht: CloudyNight2,
  buien: Showers,
};

const Home = () => {
  const [currTemp, setCurrTemp] = useState(0);
  const [location, setLocation] = useState('Amsterdam');
  const [samenv, setSamenv] = useState('');
  const [image, setImage] = useState(Cloudy);
  const [sunRise, setSunRise] = useState('');
  const [sunSet, setSunSet] = useState('');
  const [verw, setVerw] = useState('');
  const [wind, setWind] = useState('');
  const [message, setMessage] = useState('');
  const [alarm, setAlarm] = useState('');
  const [visibility, setVisibility] = useState('');
  const [windDirection, setWindDirection] = useState('');
  const userLatitude = useRef(0);
  const userLongtitude = useRef(0);

  const windDirectionMap = {
    ZZO: SouthEast,
    ZO: SouthEast,
    Z: CompassSouth,
    ZZW: SouthWest,
    ZW: SouthWest,
    O: CompassEast,
    ONO: NorthEast,
    N: CompassNorth,
    NO: NorthWest,
    NNO: NorthWest,
    W: CompassWest,
  };

  useEffect(() => {
    const clock = document.getElementById('clock');
    getLocation();
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
        setSunRise(data.liveweer[0].sup);
        setSunSet(data.liveweer[0].sunder);
        setImage(imageMap[data.liveweer[0].image]);
        setVerw(data.liveweer[0].verw);
        setWind(data.liveweer[0].windkmh);
        setMessage(data.liveweer[0].ltekst);
        setAlarm(data.liveweer[0].alarm);
        setVisibility(data.liveweer[0].zicht);
        setWindDirection(data.liveweer[0].windr);
      });
    });

    const hoursCardsContainer = document.querySelector('.hoursCardsContainer');
    if (hoursCardsContainer) {
      hoursCardsContainer.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          hoursCardsContainer.scrollBy({
            left: event.deltaY,
            behavior: 'smooth',
          });
        }
      });
    }

    return () => {
      if (hoursCardsContainer) {
        hoursCardsContainer.removeEventListener('wheel', (event) => {
          if (event.deltaY !== 0) {
            event.preventDefault();
            hoursCardsContainer.scrollBy({
              left: event.deltaY,
              behavior: 'smooth',
            });
          }
        });
      }
    };
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      userLatitude.current = position.coords.latitude;
      userLongtitude.current = position.coords.longitude;
      // console.log(position.coords.latitude, position.coords.longitude);
      getCity(position.coords.latitude, position.coords.longitude);
    });

    const getCity = async (userLatitude, userLongtitude) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLatitude}&lon=${userLongtitude}`
        );
        const data = await response.json();
        if (data.address) {
          setLocation(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.country ||
              'Unknown'
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
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
          <div className='currentWeather'>
            <img className='currentWeatherIcon' src={image} alt='Cloud' />
            <p className='temp'>{currTemp}° </p>
            <h3>{samenv}</h3>
            <div className='windInfo'>
              <h3>💨 {wind} Km/h From :</h3>
              <img
                className='compass'
                src={windDirectionMap[windDirection]}
                alt='direction'
              />
            </div>
          </div>
        </div>
        <div className='Hourly'>
          <div className='hoursCardsContainer'>
            <HourCard latitude={userLatitude} longtitude={userLongtitude} />
          </div>
        </div>
        <div className='verwContainer'>
          <p>{verw}</p>
        </div>

        <div className='sunInfoContainer'>
          <div className='sunrise'>
            <img src={Day} alt='' />
            <h3>Sunrise</h3>
            <h1>{sunRise}</h1>
          </div>
          <div className='sunrise'>
            <img src={Night} alt='' />
            <h3>Sunset</h3>
            <h1>{sunSet}</h1>
          </div>
        </div>
        <div className='verwContainer'>
          <h2>{alarm}</h2>
          <p>{message}</p>
        </div>
        <div className='verwContainer'>
          <h2>Visibility : {Number(visibility).toLocaleString()} Km</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
