import React, {useState} from 'react'
import {fetchLocation, fetchForecast} from './utils/fetchSurfline'

import AddSessionForm from './components/AddSessionForm'; 
import SessionLog from './components/session-log/Log'; 

// To do:
// add to GitHub and move to project plan
// [AddSessionForm] beef up session entries (board, notes, rating, etc)
// [?] button to add spot
// [App] useEffect to pull spots from FB & pass into form

const spots = [
  {name: "18th St. AB", id: "5842041f4e65fad6a7708a8c"},
  {name: "Jax Beach Pier", id: "5842041f4e65fad6a7708aa0"},
  {name: "90th St. Rockaway", id: "5842041f4e65fad6a7708852"},
  {name: "Ponce Inlet", id: "5842041f4e65fad6a7708a9d"},
  {name: "Ditch Plains", id: "5842041f4e65fad6a77089ec"},
]

function App() {
  const [data, setData] = useState({});

  return (
    <div className="App">
          <h1>surf log</h1>
          <button onClick={() => setData(fetchLocation("5842041f4e65fad6a7708a9d"))}>
              fetch location
          </button>
          <button onClick={() => setData(fetchForecast("5842041f4e65fad6a7708aa0", "14:25", "15:25"))}>
              fetch forecast
          </button>
          <AddSessionForm/>
          <SessionLog/>
    </div>
  );
}

export default App;
