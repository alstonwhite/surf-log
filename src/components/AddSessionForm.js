import React, {useState} from 'react'
import firebase from '../utils/firebase'
import 'firebase/database'

import { fetchForecast } from '../utils/fetchSurfline'

const spots = [
    {name: "18th St. AB", id: "5842041f4e65fad6a7708a8c"},
    {name: "Jax Beach Pier", id: "5842041f4e65fad6a7708aa0"},
    {name: "90th St. Rockaway", id: "5842041f4e65fad6a7708852"},
    {name: "Ponce Inlet", id: "5842041f4e65fad6a7708a9d"},
    {name: "Ditch Plains", id: "5842041f4e65fad6a77089ec"},
  ]

const AddSessionForm = () => {

    const [inputs, setInputs] = useState({spot: spots[0], startTime: null, endTime: null});
    const [sessionData, setSessionData] = useState(null);


    const timeConvert = (timeStr) => {
        const current = new Date()
        return Math.floor(new Date(current.toString().slice(0,16) + timeStr + ":00"+ current.toString().slice(24)).getTime()/1000);
    }

    const sendData = (data) => {
        const dataRef = firebase.database()
        if (data) {
            console.log('session saved')
            dataRef.ref('sessions/').push(data);
        } else {
            console.log('no data')
        }
    }
    

    return (
        <div>
            <h3>Add a Session</h3>
            <label htmlFor="spot">Spot: </label>
            <select id="spot" name="spot" required onChange={(e)=>setInputs({...inputs, spot: spots.find(entry => entry.id === e.target.value)})}>
                {spots.map(spot => <option key={spot.id} value={spot.id}>{spot.name}</option>)}
            </select>
            <label htmlFor="start-time">Start Time: </label>
            <input type="time" id="start-time" name="start-time" min="00:00" max="23:59" required 
                onChange={e => 
                setInputs({...inputs, startTime: {time: e.target.value, timestamp: timeConvert(e.target.value)}})}
            ></input>
            {/* validate end time after start time */}
            <label htmlFor="end-time">End Time: </label>
            <input type="time" id="end-time" name="end-time" min="00:00" max="23:59" required onChange={(e)=>setInputs({...inputs, endTime: {time: e.target.value, timestamp: timeConvert(e.target.value)}})}></input>
            <button 
                onClick=
                {
                    () => {
                        fetchForecast(inputs.spot.id, inputs.startTime.timestamp, inputs.startTime.timestamp).then(data => setSessionData({...data, entry: inputs}));
                        console.log("inputs", inputs)
                        // console.log(inputs.spot, timeConvert(inputs.startTime), timeConvert(inputs.startTime));
                    }
                }
            >Add Session</button>
            <button 
                onClick=
                {() => {
                        sendData(sessionData)
                    }
                }
            >Send to Firebase</button>
        </div>
    )
};
    
export default AddSessionForm;