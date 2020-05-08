import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Countries from "./Countries";

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter,setFilter] = useState("")
    const handlefilterChange = (event) => setFilter(event.target.value)


      useEffect(() => {
          console.log('effect')
          axios
              .get('https://restcountries.eu/rest/v2/all\n')
              .then(response => {
                  console.log('promise fulfilled')
                  setCountries(response.data)
              })
      }, [])
      console.log('render', countries.length, 'countries')

  return(
      <div>
        Find countries: <input value={filter} onChange={handlefilterChange}/>
        <Countries countries={countries} filter={filter} setFilter={setFilter}/>
      </div>
  )


}

export default App;
