import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Accordion,
  Card,
  Form,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { auth, database } from "../../utils/firebase";
import { timeConvert, times } from "../../utils/helper";
import { fetchForecast } from "../../utils/fetchSurfline";


const AddSessionForm = () => {
  const [spotData, setSpotData] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const spotRef = useRef();
  const boardRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const ratingRef = useRef();
  const notesRef = useRef();

  const uid = auth.currentUser.uid;

  const sendData = (data) => {
    const dataRef = database;
    if (data) {
      console.log("Session saved");
      dataRef.ref(`${uid}/sessions`).push(data);
    } else {
      console.log("Unable to add session data to Firebase");
    }
  };

  useEffect(() => {
    const checkData = () => {
      database
        .ref(`${uid}/spots/`)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("Spot data found:");
            console.log(Object.values(snapshot.val()));
            setSpotData(Object.values(snapshot.val()));
          } else {
            console.log("No spot data found in Firebase");
          }
        });
      database
        .ref(`${uid}/boards/`)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("Board data found:");
            console.log(Object.values(snapshot.val()));
            setBoardData(Object.values(snapshot.val()));
          } else {
            console.log("No board data found in Firebase");
          }
        });
    };
    checkData();
  }, [uid]);

  async function handleSubmit(e) {
    e.preventDefault();

    let inputs = {
      spot: spotData.find((entry) => entry.id === spotRef.current.value),
      board: boardData.find(
        (entry) => entry.id === parseInt(boardRef.current.value)
      ),
      startTime: {
        time: startTimeRef.current.value,
        timestamp: timeConvert(startTimeRef.current.value),
      },
      endTime: {
        time: endTimeRef.current.value,
        timestamp: timeConvert(endTimeRef.current.value),
      },
      rating: ratingRef.current.value,
      notes: notesRef.current.value,
    };

    try {
      setError("");
      setLoading(true);
      let forecastData = await fetchForecast(
        inputs.spot.id,
        inputs.startTime.timestamp,
        inputs.endTime.timestamp
      );
      sendData({ ...forecastData, entry: inputs });
      spotRef.current.value = "";
      boardRef.current.value = "";
      startTimeRef.current.value = "";
      endTimeRef.current.value = "";
      ratingRef.current.value = "";
      notesRef.current.value = "";
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } catch (err) {
      setError("Failed to add session", err);
    }
    setLoading(false);
  }

  return (
    <>
      <Accordion>
        <Container>
          <Card.Title>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              New Session
            </Accordion.Toggle>
          </Card.Title>
          <Accordion.Collapse eventKey="0">
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridSpot">
                  <Form.Label size="sm">Spot:</Form.Label>
                  <Form.Control type="spot" ref={spotRef} as="select" size="sm">
                    <option>
                      Select spot
                    </option>
                    {spotData ? (
                      spotData.map((spot) => (
                        <option key={spot.id} value={spot.id}>
                          {spot.name}
                        </option>
                      ))
                    ) : (
                      <option>
                        No current spots
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridBoard">
                  <Form.Label size="sm">Board:</Form.Label>
                  <Form.Control
                    type="board"
                    ref={boardRef}
                    as="select"
                    size="sm"
                  >
                    <option>
                      Select board
                    </option>
                    {boardData ? (
                      boardData.map((board) => (
                        <option key={board.id} value={board.id}>
                          {board.name}
                        </option>
                      ))
                    ) : (
                      <option>
                        No current board
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStartTime">
                  <Form.Label size="sm">Start Time:</Form.Label>
                  <Form.Control
                    type="start-time"
                    ref={startTimeRef}
                    as="select"
                    size="sm"
                  >
                    <option>
                      Select time
                    </option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEndTime">
                  <Form.Label size="sm">End Time:</Form.Label>
                  <Form.Control
                    type="end-time"
                    ref={endTimeRef}
                    as="select"
                    size="sm"
                  >
                    <option>
                      Select time
                    </option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRating">
                  <Form.Label size="sm">Rating: </Form.Label>
                  <Form.Control
                    type="rating"
                    ref={ratingRef}
                    as="select"
                    size="sm"
                  >
                    <option>
                      Select rating
                    </option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formGridNotes">
                <Form.Label size="sm">Notes</Form.Label>
                <Form.Control
                  type="notes"
                  ref={notesRef}
                  as="textarea"
                  placeholder="Add notes..."
                  rows={3}
                  size="sm"
                />
              </Form.Group>
              <Button type="submit" disabled={loading}>
                Add Session
              </Button>
            </Form>
          </Accordion.Collapse>
          <Alert variant="success" show={show}>
            Session added
          </Alert>
          {error && <Alert variant="danger">{error}</Alert>}
        </Container>
      </Accordion>
    </>
  );
};

export default AddSessionForm;
