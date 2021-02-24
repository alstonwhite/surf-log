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
                    <div className="session-entry__date">{entry.entry.startTime.time}</div>
                    <div className="session-entry__location">{entry.entry.spot.name}</div>
              </div>
            )}
        </div>
    )
};
    
export default SessionLog;