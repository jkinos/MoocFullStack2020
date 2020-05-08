import React from "react";

const Weather =({weather, capital})=>{

    const weatherIcons= weather.current.weather_icons.map(icon =><img src={icon}/>)

        return (
                <div>
                    <h4>Weather in {capital}</h4>
                    temperature: {weather.current.temperature} celsius<br/>
                    {weatherIcons}<br/>
                    wind: {weather.current.wind_speed} direction {weather.current.wind_dir}
                </div>)
}
export default Weather
