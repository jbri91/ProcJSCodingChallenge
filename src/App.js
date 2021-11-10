import React, { useEffect, useState } from 'react' 
import Navigation from './Components/Navigation'
import './App.css';

function App() {

  const [brewery, setBrewery] = useState([])
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const typeOfBrewery = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprieter', 'closed']

async function fetchCityData() {
  const response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`);
  const breweries = await  response.json()
  if (city) {
    setBrewery(breweries)
}
}
console.log('brewery', brewery)
const handleSubmit = (e) => {
  e.preventDefault();
  if (e.target.id == 'state') {
    setType('')
    fetchCityData();
  }
  else 
  handleSelect()
e.target.reset()
}

const handleSelect = (e) => {
  console.log(e.target.value)
  setType(e.target.value)
  fetchTypeData()
  setCity('')
}

async function fetchTypeData() {
  const response = await fetch(`https://api.openbrewerydb.org/breweries?by_type=${type}`);
  const breweries = await  response.json()
  if (type) {
    setBrewery(breweries)
}
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

const brews = [];
  for (
    let i = 0;
    i < brewery.length;
    i++
  ) {
    brews.push(
      <tr key={brewery.name}>
        <td>{brewery[i].name}</td>
        <td>{brewery[i].phone}</td>
        <td>{brewery[i].street}</td>
        <td>{brewery[i].state}</td>
        <td>{brewery[i].city}</td>
        <td>{brewery[i].country}</td>
        <td>{brewery[i].website_url}</td>
      </tr>
    );
  }

  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <form id='state' onSubmit={handleSubmit}>
        <input type='text' id='state' placeholder='Search By City' onChange={e => setCity(e.target.value)}></input>
        </form>
        <select onChange={handleSelect} name='selectList' id='selectList'>
        {typeOfBrewery.map((type, index) => {
          return <option value={type}>{type}</option>
        })}
        </select>
        <br/>
        <h2> List of Breweries</h2>
        <p>{city}</p>
        <table className='table table-success table-striped' style={{fontSize:'20px', border: 'solid'}}>
          <thead>
            <tr style={{ fontWeight: 'bold', fontSize: '20px'}}>
              <th>Name</th>
              <th>Phone</th>
              <th>Street</th>
              <th>State</th>
              <th>City</th>
              <th>country</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
           {brews}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
