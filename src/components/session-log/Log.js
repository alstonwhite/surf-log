import React, { useState, useEffect } from 'react'
import firebase from '../../utils/firebase'
import 'firebase/database'

const SessionLog = () => {

    const [sessionLogData, setSessionLogData] = useState(null);

    const checkData = () => {
        firebase.database().ref('sessions/').on('value', snapshot => {
            if (snapshot.exists()) {
                console.log('data found:');
                console.log(Object.values(snapshot.val()));
                setSessionLogData(Object.values(snapshot.val()))
            }
            else {
                console.log('no data found');
            }
        })
    }

    useEffect(() => {
        checkData();
      }, []);


    return (
        <div>
            <h3>Session Log</h3>
            {sessionLogData && sessionLogData.map(entry =>
                <div className="session-entry" id="session-entry">
                    <div className="session-entry__header">
                        {new Date(entry.entry.startTime.timestamp*1000).toString().slice(0,16) + " | " 
                        + entry.entry.spot.name}
                    </div>
                    <div className="session-entry__form-data">
                        <div>Time</div>
                        <div>Board</div>
                        <div>Notes</div>
                    </div>
                    <div className="session-entry__conditions-data">
                        <table>
                            <thead>
                                <th></th>
                                {entry.session.tide.map(data =>
                                    <th>{data.timestamp}</th>
                                )}
                            </thead>
                            <tbody>
                                <tbody>Tide</tbody>
                                {entry.session.tide.map(data =>
                                    <th>{data.height}</th>
                                )}
                                <tbody>Wave</tbody>
                                {entry.session.wave.map(data =>
                                    <th>{data.max}</th>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div>{JSON.stringify(entry.session)}</div>
              </div>
            )}
        </div>
    )
};
    
export default SessionLog;