import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37066b1cca04b9508cf4ea94cac08457&units=metric`)
    .then(res => res.json())
    .then(data => {
      const weatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };
      setPending(false);
      setWeather(weatherData)
      console.log(weatherData);
    });
  });

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && <WeatherSummary {...weather} /> }
      { pending && <Loader /> }
    </section>
  )
};

export default WeatherBox;