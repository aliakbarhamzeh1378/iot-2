const celery = require('celery-node');

const worker = celery.createWorker(
  "amqp://",
  "amqp://"
);
worker.register("tasks.add", (a, b) => a + b);
worker.start();