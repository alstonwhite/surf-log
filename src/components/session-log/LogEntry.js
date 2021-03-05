import React from 'react'
import { Container, Table } from 'react-bootstrap'


const LogEntry = ({session}) => {

    return (
        <>
            <Container>
                <div className="session-entry__header">
                    {new Date(session.entry.startTime.timestamp*1000).toString().slice(0,16) + " | " 
                        + session.entry.spot.name}
                </div>
                <Table bordered size="sm">
                    <tbody>
                        <tr>
                            <td>Time:</td>
                            <td>{`${session.entry.startTime.time} - ${session.entry.startTime.time}`}</td>
                        </tr>
                        <tr>
                            <td>Board:</td>
                            <td>{session.entry.board.name}</td>
                            
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td>{session.entry.notes}</td> 
                        </tr>
                    </tbody>
                </Table>
                <Table bordered size="sm">
                <thead>
                    <tr>
                        <th>Fields</th>
                        {session.session.tide.map(data =>
                            <th>{data.timestamp}</th>
                        )}
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>Tide:</td>
                            {session.session.tide.map(data =>
                                <th>{data.height}</th>
                            )}
                        </tr>
                        <tr>
                            <td>Wave:</td>
                            {session.session.wave.map(data =>
                                <th>{data.max}</th>
                            )}
                        </tr>
                    </tbody>
                </Table>
                <div>{JSON.stringify(session.session)}</div>
            </Container> 
        </>
    )
};
    
export default LogEntry;