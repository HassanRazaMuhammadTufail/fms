// simulated_device.js

const http = require('http');

// Function to generate random data
function generateData() {
    const location = {
        lat: Math.random() * 90,
        lng: Math.random() * 180
    };
    const speed = Math.random() * 100;

    return { location, velocity: speed, license: 'String' };
}

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

// Simulate sending data at regular intervals
setInterval(() => {
    const data = generateData();
    console.log('Sending data:', data);
    sendData(data);
}, 5000); // Send data every 5 seconds
