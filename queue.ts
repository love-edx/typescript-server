import { Queue, Worker } from "bullmq";
const redisOptions = { host: '127.0.0.1', port: 6379, password: '' };
let count = 0;
// Our job Queue
export const queueService = new Queue("demo", { connection: redisOptions });

export async function createMessage(message) {
    return { status: 200, data: { message: message, count: count++ } };
};

const worker = new Worker('demo', async (job) => {
    return createMessage({ message: 'Welcome to worker function' });
}, { connection: redisOptions });


worker.on('completed', (job, result) => {
    console.log("Completed", result)
});
worker.on('failed', (job, result) => {
    console.log("Failed")
});
worker.on('error', (error) => {
    console.log("Error")
})