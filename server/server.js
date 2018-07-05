const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;


// serve the webclient
app.use(express.static(path.join(__dirname, 'web-application/build')));

// middleware for log the request url
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

app.use(
    '/proxy',
    proxy('http://40.117.248.167', {
        proxyReqPathResolver: req => {
            console.log('serving to proxy: ', req.originalUrl);
            console.log(`/LFD${req.url}`)
            return `/LFD${req.url}`;
        },
    })
);

/// app.get should be last for the other api calls and proxy will works fine.
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'web-application/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
