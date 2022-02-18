import React from 'react'
import { Card, Table } from 'react-bootstrap'


const LogEntry = ({session}) => {

    const formatSessionData = sessionData => {
        let formattedData = [];
        for (let i = 0; i < sessionData.tide.length; i++) {
            formattedData.push(
                {
                    timestamp: sessionData.tide[i].timestamp,
                    tide: sessionData.tide[i],
                    wave: sessionData.wave[i],
                    weather: sessionData.weather[i],
                    wind: sessionData.wind[i],
                })
        }
        return formattedData
    }

    const formatDayData = dayData => [...dayData.tide.highs, ...dayData.tide.lows].sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1)

    const degToDir = deg => {
        if (deg>11.25 && deg<=33.75){
            return "NNE";
          }else if (deg>33.75 && deg<=56.25){
            return "ENE";
          }else if (deg>56.25 && deg<=78.75){
            return "E";
          }else if (deg>78.75 && deg<=101.25){
            return "ESE";
          }else if (deg>101.25 && deg<=123.75){
            return "ESE";
          }else if (deg>123.75 && deg<=146.25){
            return "SE";
          }else if (deg>146.25 && deg<=168.75){
            return "SSE";
          }else if (deg>168.75 && deg<=191.25){
            return "S";
          }else if (deg>191.25 && deg<=213.75){
            return "SSW";
          }else if (deg>213.75 && deg<=236.25){
            return "SW";
          }else if (deg>236.25 && deg<=258.75){
            return "WSW";
          }else if (deg>258.75 && deg<=281.25){
            return "W";
          }else if (deg>281.25 && deg<=303.75){
            return "WNW";
          }else if (deg>303.75 && deg<=326.25){
            return "NW";
          }else if (deg>326.25 && deg<=348.75){
            return "NNW";
          }else{
            return "N"; 
          }
    }

    return (
        <>
            <Card>
                <Card.Header as="h5">
                    {new Date(session.entry.startTime.timestamp*1000).toString().slice(0,16) + " | " 
                        + session.entry.spot.name}
                </Card.Header>
                <Card.Body>
                  <Table bordered size="sm">
                      <thead>
                          <tr>
                              <th>Time</th>
                              <th>Board</th>
                              <th>Rating</th>
                              <th>Notes</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>{`${session.entry.startTime.time} - ${session.entry.endTime.time}`}</td>
                              <td>{session.entry.board.name}</td>
                              <td>{session.entry.rating ? session.entry.rating : "-"}</td>
                              <td>{session.entry.notes}</td> 
                          </tr>
                      </tbody>
                  </Table>
                  <Table bordered size="sm">
                      <thead>
                          <tr>
                              <th>Time</th>
                              <th>Surf</th>
                              <th>Primary Swell</th>
                              <th>Secondary Swell</th>
                              <th>Wind</th>
                              <th>Tide</th>
                          </tr>
                      </thead>
                      <tbody>
                          {formatSessionData(session.session).map((data, idx) =>
                              <tr key={idx}>
                                  <td>{new Date(data.timestamp*1000).toString().slice(16,21)}</td>
                                  <td>{`${Math.floor(data.wave.surf.min)} - ${Math.floor(data.wave.surf.max)} ft`}</td>
                                  <td>{`${data.wave.swells[0].height}ft - ${data.wave.swells[0].period}s - ${degToDir(data.wave.swells[0].direction)}`}</td>
                                  <td>{`${data.wave.swells[1].height}ft - ${data.wave.swells[1].period}s - ${degToDir(data.wave.swells[1].direction)}`}</td>
                                  <td>{`${Math.floor(data.wind.speed)}mph - ${degToDir(data.wind.direction)}`}</td>
                                  <td>{`${data.tide.height} ft`}</td>
                              </tr> 
                          )}
                      </tbody>
                  </Table>
                  <Table bordered size="sm">
                      <thead>
                          <tr>
                            {formatDayData(session.day).map((data, idx) =>
                              <th key={idx}>{data.type.charAt(0)+data.type.substring(1).toLowerCase()}</th>
                            )}
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {formatDayData(session.day).map((data, idx) =>
                            <td key={idx}>{new Date(data.timestamp*1000).toString().slice(16,21)}</td>
                          )}
                        </tr>
                      </tbody>
                  </Table>
                  <Table bordered size="sm">
                      <thead>
                          <tr>
                            <th>Sunrise</th>
                            <th>Sunset</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{new Date(session.day.sunriseSunset.sunrise*1000).toString().slice(16,21)}</td>
                          <td>{new Date(session.day.sunriseSunset.sunset*1000).toString().slice(16,21)}</td>
                        </tr>
                      </tbody>
                  </Table>
                  {/* <div>{JSON.stringify(session.day)}</div> */}
                </Card.Body>
            </Card>
        </>
    )
};
    
export default LogEntry;