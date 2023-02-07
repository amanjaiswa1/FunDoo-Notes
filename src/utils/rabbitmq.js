import { sendRabbitMail } from './user.util';
import logger from '../config/logger';

var amqp = require('amqplib/callback_api');

export const sender = (registeredData) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'Registered';
            var msg = registeredData;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            logger.info(`[x] Sent ${msg}`);
        });
    });
}

const receiver = () => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'Registered';

            channel.assertQueue(queue, {
                durable: false
            });

            logger.info(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, function (msg) {
                logger.info(`[x] Received ${msg.content.toString()}`);
                let userData = JSON.parse(msg.content.toString());
                sendRabbitMail(userData.FirstName, userData.LastName, userData.Email);
            }, {
                noAck: true
            });
        });
    });
}
receiver();