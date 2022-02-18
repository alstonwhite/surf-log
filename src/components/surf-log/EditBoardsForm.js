import React, { useState, useEffect, useRef } from "react";
import firebase from "../../utils/firebase";
import "firebase/database";
import {
  Container,
  Accordion,
  Card,
  Form,
  ListGroup,
  Col,
  Button,
  Alert,
  ListGroupItem,
} from "react-bootstrap";
import { auth } from "../../utils/firebase";

const EditBoardsForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const boardRef = useRef();

  const uid = auth.currentUser.uid;

  useEffect(() => {
    const checkData = () => {
      firebase
        .database()
        .ref(`${uid}/boards/`)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("Board data found:");
            console.log(Object.values(snapshot.val()));
            setData(Object.values(snapshot.val()));
          } else {
            console.log("No board data found in Firebase");
          }
        });
    };
    checkData();
  }, [uid]);

  const sendData = (data) => {
    const dataRef = firebase.database();
    if (data) {
      console.log("session saved");
      dataRef.ref(`${uid}/boards`).push(data);
    } else {
      console.log("Unable to add board data to Firebase");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let nextId = data ? data[data.length - 1].id + 1 : 0;

    let inputs = {
      name: boardRef.current.value,
      id: nextId,
    };

    try {
      setError("");
      setLoading(true);
      sendData(inputs);
      boardRef.current.value = "";
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    } catch (err) {
      setError("Failed to add board", err);
    }

    setLoading(false);
  }

  return (
    <>
      <Accordion>
        <Container>
          <Card.Title>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Edit Boards
            </Accordion.Toggle>
          </Card.Title>
          <Accordion.Collapse eventKey="0">
            <Container>
              <Card.Title>Current Boards</Card.Title>
              <ListGroup>
                {data ? (
                  data.map((board) => (
                    <ListGroupItem key={board.id} size="sm">
                      {board.name}
                    </ListGroupItem>
                  ))
                ) : (
                  <ListGroupItem size="sm">No Current Boards</ListGroupItem>
                )}
              </ListGroup>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formGridBoard">
                  <Form.Label size="sm">New Board:</Form.Label>
                  <Form.Control
                    type="board"
                    ref={boardRef}
                    placeholder="New board name"
                    size="sm"
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" disabled={loading}>
                  Add Board
                </Button>
              </Form>
            </Container>
          </Accordion.Collapse>
          <Alert variant="success" show={show}>
            Board added
          </Alert>
          {error && <Alert variant="danger">{error}</Alert>}
        </Container>
      </Accordion>
    </>
  );
};

export default EditBoardsForm;
