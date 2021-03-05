import React, { useState } from 'react'
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

const boards = [
    {name: "Bing Dharma", id: 1},
    {name: "Ken White", id: 2}
]

const AddSessionForm = () => {

    const [inputs, setInputs] = useState({spot: null, board: null, startTime: null, endTime: null, notes: null});
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
        <div className="add-session-form">
            <h3 className="add-session-form__title">New Session</h3>
            <div className="add-session-form__body">
                <label className="add-session-form__spot-label" htmlFor="spot">Spot: </label>
                <select 
                    className="add-session-form__spot"
                    id="spot" 
                    name="spot" 
                    required 
                    onChange={(e)=>setInputs({...inputs, spot: spots.find(entry => entry.id === e.target.value)})}
                >
                    <option value="" disabled selected>Select spot</option>
                    {spots.map(spot => <option key={spot.id} value={spot.id}>{spot.name}</option>)}
                </select>
                <label className="add-session-form__start-time-label" htmlFor="start-time">Start Time: </label>
                <input 
                    className="add-session-form__start-time"
                    type="time" 
                    id="start-time" 
                    name="start-time" 
                    min="00:00" 
                    max="23:59" 
                    required 
                    onChange={e => 
                    setInputs({...inputs, startTime: {time: e.target.value, timestamp: timeConvert(e.target.value)}})}
                ></input>
                {/* validate end time after start time */}
                <label className="add-session-form__end-time-label" htmlFor="end-time">End Time: </label>
                <input 
                    className="add-session-form__end-time"
                    type="time" 
                    id="end-time" 
                    name="end-time" 
                    min="00:00" 
                    max="23:59" 
                    required 
                    onChange={(e)=>setInputs({...inputs, endTime: {time: e.target.value, timestamp: timeConvert(e.target.value)}})}
                ></input>
                <label className="add-session-form__board-label" htmlFor="board">Board: </label>
                <select 
                    className="add-session-form__board"
                    id="board" 
                    name="board" 
                    required
                    onChange={(e)=>setInputs({...inputs, board: boards.find(entry => entry.id === parseInt(e.target.value))})}
                >
                    <option value="" disabled selected>Select board</option>
                    {boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
                </select>
                <button 
                    className="add-session-form__add-btn"
                    onClick=
                    {() => {
                            fetchForecast(inputs.spot.id, inputs.startTime.timestamp, inputs.startTime.timestamp).then(data => setSessionData({...data, entry: inputs}));
                            console.log("inputs", inputs)
                            // console.log(inputs.spot, timeConvert(inputs.startTime), timeConvert(inputs.startTime));
                    }}
                    >Add Session</button>
                <button 
                    className="add-session-form__send-btn" 
                    onClick={() => {sendData(sessionData)}}
                >Send to Firebase</button>
                <textarea
                    className="add-session-form__notes"
                    type="text"
                    placeholder="Add notes..."
                    onChange={(e)=>setInputs({...inputs, notes: e.target.value})}
                ></textarea>
            </div>
        </div>
    )
};
    
export default AddSessionForm;