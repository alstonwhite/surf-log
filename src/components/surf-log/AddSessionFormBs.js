import React, { useState, useRef } from 'react'
import firebase from '../../utils/firebase'
import 'firebase/database'
import { Container, Accordion, Card, Form, Col, Button, Alert } from 'react-bootstrap'

import { fetchForecast } from '../../utils/fetchSurfline'

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

const times = [
                "00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30",
                "06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
                "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
                "18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"
            ]

const AddSessionFormBs = () => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const spotRef = useRef()
    const boardRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()
    const ratingRef = useRef()
    const notesRef = useRef()
    



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

    async function handleSubmit(e) {
        e.preventDefault()

        let inputs = {
            spot: spots.find(entry => entry.id === spotRef.current.value),
            board: boards.find(entry => entry.id === parseInt(boardRef.current.value)),
            startTime: {time: startTimeRef.current.value, timestamp: timeConvert(startTimeRef.current.value)},
            endTime: {time: endTimeRef.current.value, timestamp: timeConvert(endTimeRef.current.value)},
            rating: ratingRef.current.value,
            notes: notesRef.current.value
        }

        try {
            setError("")
            setLoading(true)
            fetchForecast(inputs.spot.id, inputs.startTime.timestamp, inputs.endTime.timestamp).then(data => sendData({...data, entry: inputs}))
            spotRef.current.value="";
            boardRef.current.value="";
            startTimeRef.current.value="";
            endTimeRef.current.value="";
            ratingRef.current.value="";
            notesRef.current.value="";
            setShow(true)
            setTimeout(() => {setShow(false)}, 5000)
          } catch(err) {
            setError("Failed to add session", err)
          }
      
          setLoading(false)
    }

    // add error message
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
                                        <option value="" disabled selected>Select spot</option>
                                        {spots.map(spot => <option key={spot.id} value={spot.id}>{spot.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridBoard">
                                    <Form.Label size="sm">Board:</Form.Label>
                                    <Form.Control type="board" ref={boardRef} as="select" size="sm">
                                        <option value="" disabled selected>Select board</option>
                                        {boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridStartTime">
                                    <Form.Label size="sm">Start Time:</Form.Label>
                                    <Form.Control type="start-time" ref={startTimeRef} as="select" size="sm">
                                        <option value="" disabled selected>Select time</option>
                                        {times.map(time => <option key={time} value={time}>{time}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEndTime">
                                    <Form.Label size="sm">End Time:</Form.Label>
                                    <Form.Control type="end-time" ref={endTimeRef} as="select" size="sm">
                                        <option value="" disabled selected>Select time</option>
                                        {times.map(time => <option key={time} value={time}>{time}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridRating">
                                    <Form.Label size="sm">Rating: </Form.Label>
                                    <Form.Control type="rating" ref={ratingRef} as="select" size="sm">
                                        <option value="" disabled selected>Select rating</option>
                                        {[1,2,3,4,5].map(rating => <option key={rating} value={rating}>{rating}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formGridNotes">
                                <Form.Label size="sm">Notes</Form.Label>
                                <Form.Control type="notes" ref={notesRef} as="textarea" placeholder="Add notes..." rows={3} size="sm"/>
                            </Form.Group>
                            <Button type="submit" disabled={loading}>Add Session</Button>
                        </Form>
                    </Accordion.Collapse>
                    <Alert variant="success" show={show}>
                        Session added
                    </Alert>
                </Container>
            </Accordion>
        </>
    )
};
    
export default AddSessionFormBs;