import React, {useEffect, useState} from 'react';
import Weather from './Weather'
import axios from "axios";


const Country = (props) => {
    const [weather, setWeather] = useState(undefined)

        useEffect(() => {
            console.log('effect')
            axios
                .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${props.capital}\n`)
                .then(response => {
                    console.log('promise fulfilled')

                    setWeather(response.data)
                    console.log(response.data)
                    console.log(weather)
                })
        }, [])

    const languages = props.languages.map(language => <li>{language.name}</li>)

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }console.log(weather)

    if (weather===undefined){
        return 'loading...'
    }else if(weather.success===false){
        return (
        <div>
            <h1>{props.name}</h1>
            capital {props.capital}<br/>
            population {formatNumber(props.population)}<br/>
            <h2>languages</h2>
            <ul>
                {languages}
            </ul>
            <img src={props.flag} alt='countryflag' width='200'/>
            <div>Dammit! Weather rest api monthly usage limit reached, no weather data available!</div>
        </div>
        )

    }else {
        return (
            <div>
                <h1>{props.name}</h1>
                capital {props.capital}<br/>
                population {formatNumber(props.population)}<br/>
                <h2>languages</h2>
                <ul>
                    {languages}
                </ul>
                <img src={props.flag} alt='countryflag' width='200'/>
                <Weather weather={weather} capital={props.capital}/>
            </div>
        )
    }
}

export default Country