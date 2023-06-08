import express from "express";
const app = express();
import { Bstamp, Network } from 'stamping'
const PORT = process.env.PORT || 4000;
const stamping = new Bstamp();
import { CronJob } from "cron";
import { jobScheduler } from "./helper";
const data = {
    // 'client-id': "b1451bc9-4d8a-4e51-838c-c2341a1c13c3",
    // 'secret-key': "F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A",
}

// Cron job that will run after each 5 minute
new CronJob('*/5 * * * *', () => {
    console.log('Cron job running every 5 minutes...');
});

// Cron job that will run after each 30 minute
new CronJob('*/30 * * * *', () => {
    console.log('Cron job running every 30 minutes...');
});
// Cron job that will run after each 1 hours
new CronJob('0 */1 * * *', () => {
    jobScheduler(data);
    console.log(' ------------- Cron job execute in 1 hour -------');
}).start();

// Cron job that will run after each 6 hours
new CronJob('0 * /6 * * *', () => {
    console.log(' ------------- Cron job once in 6 hours -------');
    jobScheduler(data)
}).start();

// Cron job that will run once a day
new CronJob('0 0 0 * * *', () => {
    jobScheduler(data)
    console.log(' ------------- Cron job at each day -------');
}).start();


// // Cron job that will run once a day
// new CronJob('0 0 * * *', () => {
//     const date = new Date()
//     console.info(' ------------- Cron Job day basis -------', date.toLocaleDateString(), date.getHours(), date.getMinutes(), date.getSeconds());
// }).start();

const authSettings = {
    headers: {
        // 'client-id': "b1451bc9-4d8a-4e51-838c-c2341a1c13c3",
        // 'secret-key': "F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A",
    },
};
async function helloWorld() {
    return { status: 200, message: "Github Multiple actions" };
}

app.get('/', async (req, res) => {
    const schedulerData = jobScheduler(authSettings);
    return res.status(200).json({ message: 'Cron job function is working fine', data: schedulerData });

    // await stamping.authenticate(authSettings)
    //     .then((data) => {
    //         res.send(data);
    //     })
    //     .catch((error) => {
    //         res.send(error);
    //     });
})

app.listen(PORT, () =>
    console.log(`⚡Server is running here 👉 https://localhost:${PORT}`),
);

export { helloWorld }