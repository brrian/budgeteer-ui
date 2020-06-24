const fs = require('fs');

const customServiceWorker = fs.readFileSync('src/customServiceWorker.js');

fs.appendFileSync('build/service-worker.js', customServiceWorker);
