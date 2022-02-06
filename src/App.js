import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Input, Card } from "antd";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);
  const [cityMatch, setCityMatch] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      setCountries(response.data);
    };
    loadCountries();
  }, []);

  const searchInCountriesAndCapitals = data => {
    let matchescountries = countries.filter(a => a.name.common === data);
    const regex = new RegExp(`${data}`, "gi");

    let matchescities = countries.filter(a => a.capital === data);
    if (matchescountries.length > 0) {
      console.log(matchescountries, "matchescountries");
      setCountryMatch(matchescountries);
    }
    if (matchescities.length > 0) {
      console.log(matchescities, "matchescities");
      setCityMatch(matchescities);
    }
  };
  // const searchCountries = text => {
  //   let matches = countries.filter(country => {
  //     const regex = new RegExp(`${text}`, "gi");
  //     return country.name.common.match(regex);
  //     // || country.capital.match(regex);
  //   });
  //   setCountryMatch(matches);
  // };
  return (
    <div className="App">
      <h1>Country Search</h1>
      <Input
        placeholder="Enter Country or Capital Name"
        onChange={e =>
          searchInCountriesAndCapitals(e.target.value, e.target.value)
        }
        className="countryInput"
      ></Input>
      {countryMatch &&
        countryMatch.map((item, index) => (
          <div key={index}>
            <Card>
              <br />
              <br />
              <h2>{item.name.common}</h2> capital:{item.capital}
              {console.log(item.name.common)}
            </Card>
          </div>
        ))}
      {console.log(countryMatch, "countryMatch")}
      {cityMatch &&
        cityMatch.map((item, index) => (
          <div key={index}>
            <Card>
              <br />
              <br />
              <h2>{item.name.common}</h2> capital:{item.capital}
              {console.log(item.capital, "item.capital")}
            </Card>
          </div>
        ))}
      {console.log(cityMatch, "cityMatch")}
    </div>
  );
}

export default App;
