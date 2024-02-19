import { Kafka, Partitioners } from 'kafkajs';

/*********************kafka connection*********************/
const kafka = new Kafka({
  clientId: `edeXa_bNft_Mqtt`,
  brokers: [`0.0.0.0:9092`],
});

const response = {
  userName: 'kk',
  id: '6226e3284ef3b436094e7b5e',
  userId: 'e181b073-942e-46fa-9b76-d41682a2ba5c',
};
export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

producer
  .connect()
  .then((data) => {
    console.log('kafka working-----: ', data);
    producer.send({
      topic: 'test-topic',
      messages: [{ key: 'subTopic', value: JSON.stringify(response) }],
    });
  })
  .catch((error) => {
    console.log('error in connect of  kafka-----: ', error);
  });
