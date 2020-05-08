import Country from "./Country";
import React, {useEffect, useState} from "react";


const Countries = (props) => {

    const filtered = props.countries.filter(country => country.name.toUpperCase().includes(props.filter.trim().toUpperCase()))


    const rows = filtered.map(country =>
        <div>
        <Country
            key={country.name}
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flag={country.flag}
        />

        </div>)

    if (filtered.length>10) {
        return <div>'Too many matches, specify another filter'</div>
    }else if (filtered.length>1){
        return filtered.map(country =><div>{country.name}<button onClick={()=>{props.setFilter(country.name)}}>show</button></div>)
    }else {
        return <div>{rows}</div>
    }
}
export default Countries