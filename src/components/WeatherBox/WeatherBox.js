import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError ] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37066b1cca04b9508cf4ea94cac08457&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
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
      } else {
        setError(true);
      }
    });
  });
  
  return (
    <section>
      <PickCity action={handleCityChange} />
      { (weather && !pending) && <WeatherSummary {...weather} /> }
      { (pending && !error) && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;