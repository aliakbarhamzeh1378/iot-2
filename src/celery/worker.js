const celery = require('celery-node');

const worker = celery.createWorker("redis://", "redis://");

worker.register(userFile, async () => {
  const delayTime = 1000;

  await new Promise((resolve, reject) => {
    setTimeout(resolve, delayTime);
  });
  return {
    delayTime
  };
});
worker.start();