import express from "express";
const app = express();
import { Bstamp, Network } from 'stamping'
const PORT = process.env.PORT || 4000;
const stamping = new Bstamp();
import { CronJob } from "cron";


// Cron job that wll run after 2 minutes.
new CronJob('*/1,5,30,59 */1 * * *', () => {
    const date = new Date()
    console.info('Cron Job minute based ', date.toLocaleDateString(), date.getHours(), date.getMinutes(), date.getSeconds());
}).start();


// Cron job that will run once a day
new CronJob('* */6 * * *', () => {
    const date = new Date()
    console.info(' ------------- Cron Job hours based -------', date.toLocaleDateString(), date.getHours(), date.getMinutes(), date.getSeconds());
}).start();

// Cron job that will run once a day
new CronJob('0 0 * * *', () => {
    const date = new Date()
    console.info(' ------------- Cron Job day basis -------', date.toLocaleDateString(), date.getHours(), date.getMinutes(), date.getSeconds());
}).start();

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
    await stamping.authenticate(authSettings)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
})

app.listen(PORT, () =>
    console.log(`⚡Server is running here 👉 https://localhost:${PORT}`),
);

export { helloWorld }