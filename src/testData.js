const sessions = [
    {
        // add some sort of id
        day: {
            sunriseSunset: {midnight: 1614056400, sunrise: 1614081564, sunset: 1614122481},
            tide: {
                highs: [{height: 5.15, timestamp: 1614073920, type: "HIGH"}],
                hourly: [{height: 1.28, timestamp: 1614056400, type: "NORMAL"}],
                lows: [{height: 0.75, timestamp: 1614097140, type: "LOW"}]
            },
            wave: [
                {
                    surf: {max: 3.54, min: 2.53, optimatlScore: 2},
                    swells: [{direction: 60.47, directionMin: 60.47, height: 0.98, optimalScore: 0, period: 8}],
                    timestamp: 1614056400
                }
            ],
            weather:[{condition: "NIGHT_PARTLY_CLOUDY_NO_RAIN", temperature: 62.2, timestamp: 1614056400}],
            wind: [{direction: 273.29, gust: 8.86, optimalScore: 2, speed: 6.44, timestamp: 1614056400}]
        },
        entry: {
            endTime:  {time: "22:02", timestamp: 1614135720},
            spot: {id: "5842041f4e65fad6a7708a8c", name: "18th St. AB"},
            startTime: {time: "21:02", timestamp: 1614132120}
        },
        session: {
            tide: {
                highs: [{height: 5.15, timestamp: 1614073920, type: "HIGH"}],
                hourly: [{height: 1.28, timestamp: 1614056400, type: "NORMAL"}],
                lows: [{height: 0.75, timestamp: 1614097140, type: "LOW"}]
            },
            wave: [
                {
                    surf: {min: 3.54, min: 2.53, optimatlScore: 2},
                    swells: [{direction: 60.47, directionMin: 60.47, height: 0.98, optimalScore: 0, period: 8}],
                    timestamp: 1614056400
                }
            ],
            weather:[{condition: "NIGHT_PARTLY_CLOUDY_NO_RAIN", temperature: 62.2, timestamp: 1614056400}],
            wind: [{direction: 273.29, gust: 8.86, optimalScore: 2, speed: 6.44, timestamp: 1614056400}]
        }
    }
]


const spots = [
    {
        id: "5842041f4e65fad6a7708a9d",
        location: {
            city: "Ponce Inlet", 
            coordinates: [-80.92136998257725, 29.08257353385602],
            country: "United States",
            path: ",Earth,North America,United States,Florida,Volusia County,Ponce Inlet",
            region: "Volusia County"
        },
        name: "Ponce Inlet"
    }
]