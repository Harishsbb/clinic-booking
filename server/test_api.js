const http = require('http');

const doctorId = 4;
const date = '2025-11-29'; // Saturday

const options = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/appointments/available?doctorId=${doctorId}&date=${date}`,
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();
