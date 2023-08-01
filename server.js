const http = require('http');
const fs= require('fs');


const sendResponse = (res, status, message) => {
    res.writeHead(status);
    res.end(message);
};

const sendJsonResponse = (res, status, filename, modified_date) => {
    const stats = fs.statSync(filename)
    if (status == 200 && modified_date && stats.mtime <= modified_date) {
        sendResponse(res, 304, 'Not modified');
    } else {
        const data = JSON.parse(fs.readFileSync(filename));
        const rounded = new Date(Math.ceil(stats.mtime.getTime() / 1000) * 1000)
        res.writeHead(status, {
            'Content-Type': 'application/json',
            'Last-Modified': rounded.toUTCString(),
            'Cache-Control': 'no-cache',
        });
        res.end(JSON.stringify(data, null, 2));
    }
};

const port = 4000;
const base_url = `http://localhost:${port}/`

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    const urlparse = new URL(req.url, base_url);
    const modified_since = req.headers['if-modified-since']
    let modified_date = undefined;
    if (modified_since !== undefined) {
        modified_date = new Date(modified_since)
    }

    if (req.method !== 'GET') {
        sendResponse(res, 405, 'Method not allowed');
    } else if (urlparse.pathname === '/api/projects') {
        sendJsonResponse(res, 200, './data/projects.json', modified_date);
    } else if (urlparse.pathname === '/api/energy') {
        const uuid = urlparse.searchParams.get('uuid') || 'no-uuid';
        const path = `./data/energy/${uuid}.json`
        if (fs.existsSync(path)) {
            sendJsonResponse(res, 200, path, modified_date);
        } else {
            sendResponse(res, 404, 'energy not found!');
        }
    } else {
        sendResponse(res, 404, 'service not found!');
    }
});

console.log(`Find the server at: ${base_url}`); // eslint-disable-line no-console
server.listen(port)
