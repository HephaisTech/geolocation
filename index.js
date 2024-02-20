const express = require('express');
const expressip = require('express-ip');
const app = express();
const http = require('http');
const sslServer = http.createServer({ rejectUnauthorized: false, }, app);
const port = 3000;
app.use(expressip().getIpInfoMiddleware);
app.get('/', (req, res) => {
    const ipInfo = req.ipInfo;
    let { ll } = ipInfo;
    if (!ll) ll = [0, 0]
    res.json({ lat: ll[0], long: ll[1], ip: ipInfo.ip });
});
sslServer.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

