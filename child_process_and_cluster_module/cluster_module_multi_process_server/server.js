var cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }
}

function childProcess() {
  console.log(`Worker ${process.pid} started..., pid is ` + process.pid);

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World from pid ' + process.pid);
  }).listen(3000);
}