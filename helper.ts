import { CronJob } from "cron";
let cronJobs = [{ time: 1, isActive: 0 }, { time: 2, isActive: 0 }, { time: 3, isActive: 0 }];
let tempCronJobs = [];
export async function jobScheduler(data: any) {
    const jobTime = await cronTimeHelper(cronJobs)
    new CronJob(jobTime, () => {
        console.info('Webhook cronjob is running', jobTime);
    }).start();
    return jobTime;
}

async function cronTimeHelper(timeData: any) {
    let cronTimer;
    for (let i = 0; i <= timeData.length; i++) {
        if (timeData[i].isActive === 0) {
            // at each cron job update running cron job timer as true
            if (timeData[i].time == 5 || timeData[i].time == 30) cronTimer = `*/${timeData[i].time} * * * * *`;
            else if (timeData[i].time == 1 || timeData[i].time == 6) cronTimer = `0 ${timeData[i].time} * * * `;
            else cronTimer = `0 0 * * * `;

            // if last element is going to iterate so set all isActive as 0
            const lastItem = timeData[timeData.length - 1];
            if (timeData[i].time === lastItem.time) {
                cronJobs = tempCronJobs;
                cronJobs.push(timeData[i]);
                tempCronJobs = [];
                break;
            } else {
                tempCronJobs.push(cronJobs.splice(i, 1)[0]);
                break;
            }
        }
    }
    return cronTimer;
}
