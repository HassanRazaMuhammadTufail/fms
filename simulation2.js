const http = require('http');

// Custom array of latitude and longitude pairs
const customLocations = [
    { lat: 25.1227603, lng: 55.1874264, }, 
    { lat: 25.1179019, lng: 55.1997397, },
];

// Function to send data to the backend server
function sendData(data) {
    const postData = JSON.stringify(data);

    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/track',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(postData);
    req.end();
}

// Index to keep track of the current location in the customLocations array
let currentIndex = 0;

// Function to get the next location from the customLocations array
function getNextLocation() {
    const location = customLocations[currentIndex];
    currentIndex = (currentIndex + 1) % customLocations.length;
    return location;
}

// Simulate sending data at regular intervals
setInterval(() => {
    const location = getNextLocation();
    const data = { location, velocity: Math.random() * 100, license: 'abc-124' };
    console.log('Sending data:', data);
    sendData(data);
}, 5000); // Send data every 5 seconds
