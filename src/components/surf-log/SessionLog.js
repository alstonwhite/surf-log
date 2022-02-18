import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import "firebase/database";
import { Container } from "react-bootstrap";
import { auth } from "../../utils/firebase";

import LogEntry from "./LogEntry";

const SessionLog = () => {
  const [sessionLogData, setSessionLogData] = useState(null);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const checkData = () => {
      firebase
        .database()
        .ref(`${uid}/sessions/`)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("Session data found:");
            console.log(Object.values(snapshot.val()));
            setSessionLogData(Object.values(snapshot.val()));
          } else {
            console.log("No session data found in Firebase");
          }
        });
    };
    checkData();
  }, [uid]);

  console.log("sessionLogData", sessionLogData)
  return (
    <>
      <h3 className="session-log__title">Your Sessions</h3>
      <Container>
        {sessionLogData &&
          sessionLogData
            .sort((a, b) =>
              a.entry.endTime.timestamp > b.entry.endTime.timestamp ? -1 : 1
            )
            .map((entry, idx) => <LogEntry key={idx} session={entry} />)}
      </Container>
    </>
  );
};

export default SessionLog;
