import React, { useEffect, useState } from 'react' 
import Navigation from './Components/Navigation'
import './App.css';

function App() {

  const [brewery, setBrewery] = useState([])
  const [city, setCity] = useState('New York')
useEffect(() => {
 fetchData();

}, []) 

async function fetchData() {
  const response = await fetch('https://api.openbrewerydb.org/breweries?by_city=new_york');
  const breweries = await  response.json()
  setBrewery(breweries)
}


let breweryByCity = []
for (let i =0; i < brewery.length; i ++) {
  breweryByCity.push({
    id: brewery[i].id,
    name: brewery[i].name,
    city: brewery[i].city,
    country: brewery[i].country,
    phone: brewery[i].phone,
    state: brewery[i].state,
    street: brewery[i].street,
    url: brewery[i].website_url
  })
}



  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <input type='text' name='state' placeholder='Search By State' onChange={e => setCity(e.target.value)}></input>
        <br/>
        <h2> List of Breweries In {city} </h2> 
        {breweryByCity.map(function(b, idx){
          return (
          <li key={idx}>{b.name}</li>
          )
        })}
      </header>
      <ul>
    </ul>
    </div>
  );
}

export default App;
