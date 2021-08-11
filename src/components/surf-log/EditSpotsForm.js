import React, { useState, useEffect, useRef } from 'react'
import firebase from '../../utils/firebase'
import 'firebase/database'
import { Container, Accordion, Card, Form, ListGroup, Col, Button, Alert, ListGroupItem } from 'react-bootstrap'
import { auth } from '../../utils/firebase'

import { fetchLocation } from '../../utils/fetchSurfline'

const EditSpotsForm = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const spotIdRef = useRef()


    const checkData = () => {
        firebase.database().ref(`${uid}/spots/`).on('value', snapshot => {
            if (snapshot.exists()) {
                console.log('Spot data found:');
                console.log(Object.values(snapshot.val()));
                setData(Object.values(snapshot.val()))
            }
            else {
                console.log('No spot data found in Firebase');
            }
        })
    }

    useEffect(() => {
        checkData();
      });

    const uid = auth.currentUser.uid

    const sendData = (data) => {
        const dataRef = firebase.database()
        if (data) {
            console.log('session saved')
            dataRef.ref(`${uid}/spots`).push(data);
        } else {
            console.log('Unable to add spot data to Firebase')
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let inputs = {
            id: spotIdRef.current.value
        }

        try {
            setError("")
            setLoading(true)
            // Check if spot exists
            const checkLocation = await fetchLocation(inputs.id);
            (typeof checkLocation === "object") && (inputs.name = checkLocation.name);
            sendData(inputs)
            spotIdRef.current.value="";
            setShow(true)
            setTimeout(() => {setShow(false)}, 5000)
          } catch(err) {
            setError("Failed to add spot", err)
          }
      
          setLoading(false)
    }

    return (
        <>
            <Accordion>
                <Container>
                    <Card.Title>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Edit Spots
                        </Accordion.Toggle>
                    </Card.Title>
                    <Accordion.Collapse eventKey="0">
                      <Container>
                        <Card.Title>
                            Current Spots
                        </Card.Title>
                          <ListGroup>
                              {data ? data.map(spot => <ListGroupItem key={spot.id} size="sm">{spot.name}</ListGroupItem>) :
                              <ListGroupItem size="sm">No Current Spots</ListGroupItem>}
                          </ListGroup>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Col} controlId="formGridSpotId">
                                <Form.Label size="sm">New Spot ID:</Form.Label>
                                <Form.Control type="spot" ref={spotIdRef} placeholder="New spot ID"size="sm"></Form.Control>
                                <Form.Text className="text-muted">
                                    Find spot ID in Surfline web address (ex: www.surfline.com/surf-report/90th-st-rockaways/
                                        <span style={{color:"red"}}><b>5842041f4e65fad6a7708852</b></span>
                                    )
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit" disabled={loading}>Add Spot</Button>
                        </Form>
                      </Container>
                    </Accordion.Collapse>
                    <Alert variant="success" show={show}>
                        Spot added
                    </Alert>
                {error && <Alert variant="danger">{error}</Alert>}
                </Container>
            </Accordion>
        </>
    )
};
    
export default EditSpotsForm;