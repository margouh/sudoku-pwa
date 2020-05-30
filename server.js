const express = require('express');
const app = express();
// This serves static files from the specified directory
app.use(express.static(__dirname));
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

/*const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
// This serves static files from the specified directory
app.use(express.static(__dirname));
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(8081);*/