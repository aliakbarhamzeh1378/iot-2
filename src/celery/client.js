const celery = require('celery-node');
const client = celery.createClient(
    "redis://", "redis://"
);
const userFile=require("../lib/jsInput")


const task = client.createTask(userFile);

async function main() {
  const result = task.applyAsync();
  const data = await result.get();
  console.log(data);
  await client.disconnect();
}