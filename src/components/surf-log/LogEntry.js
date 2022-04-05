import React from "react";
import { Card, Table } from "react-bootstrap";
import { round, degToDir } from "../../utils/helper";

const LogEntry = ({ session }) => {
  const formatSessionData = (sessionData) => {
    let formattedData = [];
    for (let i = 0; i < sessionData.tide.length; i++) {
      formattedData.push({
        timestamp: sessionData.tide[i].timestamp,
        tide: sessionData.tide[i],
        wave: sessionData.wave[i],
        weather: sessionData.weather[i],
        wind: sessionData.wind[i],
      });
    }
    return formattedData;
  };

  const formatDayData = (dayData) =>
    [...dayData.tide.highs, ...dayData.tide.lows].sort((a, b) =>
      a.timestamp > b.timestamp
    );

  return (
    <>
      <Card>
        <Card.Header as="h5">
          {new Date(session.entry.startTime.timestamp * 1000)
            .toString()
            .slice(0, 16) +
            " | " +
            session.entry.spot.name}
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
              {formatSessionData(session.session).map((data, idx) => (
                <tr key={idx}>
                  <td>
                    {new Date(data.timestamp * 1000).toString().slice(16, 21)}
                  </td>
                  <td>{`${round(data.wave.surf.min, 0)} - ${round(
                    data.wave.surf.max, 0
                  )} ft`}</td>
                  <td>{`${round(data.wave.swells[0].height, 1)}ft - ${
                    round(data.wave.swells[0].period, 1)
                  }s - ${degToDir(data.wave.swells[0].direction)}`}</td>
                  <td>{`${round(data.wave.swells[1].height, 1)}ft - ${
                    round(data.wave.swells[1].period, 1)
                  }s - ${degToDir(data.wave.swells[1].direction)}`}</td>
                  <td>{`${round(data.wind.speed, 0)}mph - ${degToDir(
                    data.wind.direction
                  )}`}</td>
                  <td>{`${round(data.tide.height, 1)}ft`}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table bordered size="sm">
            <thead>
              <tr>
                {formatDayData(session.day).map((data, idx) => (
                  <th key={idx}>
                    {data.type.charAt(0) + data.type.substring(1).toLowerCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {formatDayData(session.day).map((data, idx) => (
                  <td key={idx}>
                    {new Date(data.timestamp * 1000).toString().slice(16, 21)}
                  </td>
                ))}
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
                <td>
                  {new Date(session.day.sunriseSunset.sunrise * 1000)
                    .toString()
                    .slice(16, 21)}
                </td>
                <td>
                  {new Date(session.day.sunriseSunset.sunset * 1000)
                    .toString()
                    .slice(16, 21)}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <div>{JSON.stringify(session.day)}</div> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default LogEntry;
