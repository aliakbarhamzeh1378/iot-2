const celery = require('celery-node');
require("../lib/jsInput")
const client = celery.createClient(
    "redis://", "redis://"
);

const task = client.sendTask(require("../lib/jsInput")).get().then(data => {
  console.log(data);
  client.disconnect();
});