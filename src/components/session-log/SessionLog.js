import React, { useState, useEffect } from 'react'
import firebase from '../../utils/firebase'
import 'firebase/database'
import { Container, Form, Col, Button } from 'react-bootstrap'

import LogEntry from './LogEntry'; 

const SessionLog = () => {

    const [sessionLogData, setSessionLogData] = useState(null);
    const [sessionsLoaded, setSessionsLoaded] = useState(10);

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
        <>
            <h3 className="session-log__title">Your Sessions</h3>
            <Container>
                {sessionLogData && sessionLogData.map(entry =>
                    <LogEntry session={entry}/>)
                }
                <Button onClick={()=>setSessionsLoaded(sessionsLoaded+10)}>Load More</Button>
            </Container> 
        </>
    )
};
    
export default SessionLog;