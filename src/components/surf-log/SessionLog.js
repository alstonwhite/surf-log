import React, { useState, useEffect } from 'react'
import firebase from '../../utils/firebase'
import 'firebase/database'
import { Container } from 'react-bootstrap'
import { auth } from '../../utils/firebase'


import LogEntry from './LogEntry'; 

const SessionLog = () => {

    const [sessionLogData, setSessionLogData] = useState(null);
    // const [sessionsLoaded, setSessionsLoaded] = useState(10);
    const uid = auth.currentUser.uid

    const checkData = () => {
        firebase.database().ref(`${uid}/sessions/`).on('value', snapshot => {
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
        <>
            <h3 className="session-log__title">Your Sessions</h3>
            <Container>
                {sessionLogData && sessionLogData.sort((a,b) => (a.entry.endTime.timestamp > b.entry.endTime.timestamp) ? -1 : 1).map(entry =>
                    <LogEntry session={entry}/>)
                }
                {/* Only show load more button if sessions > 10 */}
               {/* <Button onClick={()=>setSessionsLoaded(sessionsLoaded+10)}>Load More</Button> */}
            </Container> 
        </>
    )
};
    
export default SessionLog;