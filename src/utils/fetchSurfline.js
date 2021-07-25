export const fetchLocation = async (locationId) => {
  const location = await fetch(`http://services.surfline.com/taxonomy?type=spot&id=${locationId}`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => (
      {
        id: data.spot, 
        name: data.name, 
        location: 
          {
            city: data.in[7].name, 
            region: data.in[6].name, 
            country: data.in[2].name, 
            path: data.in[7].enumeratedPath,
            coordinates: data.location.coordinates
          }
      }
    ));
    // console.log(location)
    return location;
}

export const fetchForecast = async (locationId, start, end) => {
  const waveData = await fetch(`http://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${locationId}&days=1&intervalHours=1`)
    .then(response => response.json())
    .then(data => data.data.wave);
  const windData = await fetch(`http://services.surfline.com/kbyg/spots/forecasts/wind?spotId=${locationId}&days=1&intervalHours=1`)
    .then(response => response.json())
    .then(data => data.data.wind);
  const tideData = await fetch(`http://services.surfline.com/kbyg/spots/forecasts/tides?spotId=${locationId}&days=1&intervalHours=1`)
    .then(response => response.json())
    .then(data => (
      {
        hourly: data.data.tides.filter(entry => entry.type === "NORMAL").slice(0,-1),
        highs: data.data.tides.filter(entry => entry.type === "HIGH"),
        lows: data.data.tides.filter(entry => entry.type === "LOW")
      }
    ));
  const weatherData = await fetch(`http://services.surfline.com/kbyg/spots/forecasts/weather?spotId=${locationId}&days=1&intervalHours=1`)
    .then(response => response.json())
    .then(data => data.data.weather); 
  const sunriseSunsetData = await fetch(`http://services.surfline.com/kbyg/spots/forecasts?spotId=${locationId}&days=1&intervalHours=1`)
    .then(response => response.json())
    .then(data => data.data.sunriseSunsetTimes[0]);
  const forecast = {
    day: {wave: waveData, wind: windData, tide: tideData, weather: weatherData, sunriseSunset: sunriseSunsetData},
    session: {
      wave: waveData.filter(entry => (entry.timestamp >= (start - 3599) && entry.timestamp <= (end + 3599))), 
      wind: windData.filter(entry => (entry.timestamp >= (start - 3599) && entry.timestamp <= (end + 3599))), 
      tide: tideData.hourly.filter(entry => (entry.timestamp >= (start - 3599) && entry.timestamp <= (end + 3599))), 
      weather: weatherData.filter(entry => (entry.timestamp >= (start - 3599) && entry.timestamp <= (end + 3599))), 
    }
  };
  // 3599 unix = 59 min 59 sec --> captures previous and next hour in forecast from session times
  // console.log(tideData)
  // console.log(forecast);
  return forecast;
}