const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 9090;
const ROOT = __dirname;

const server = http.createServer((req, res) => {
    let filePath = path.join(
        ROOT,
        req.url === "/" ? "offline_glb_pins.html" : req.url
    );

    filePath = path.normalize(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }

        const ext = path.extname(filePath);

        const types = {
            ".html": "text/html",
            ".js": "application/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".glb": "model/gltf-binary",
            ".gltf": "model/gltf+json",
            ".bin": "application/octet-stream"
        };

        res.writeHead(200, {
            "Content-Type": types[ext] || "application/octet-stream"
        });

        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});