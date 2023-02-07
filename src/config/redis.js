import { createClient } from "redis";
import logger from '../config/logger';

export const client = createClient();
const redis = async () => {
    try {
        await client.connect();
        logger.info('Connected to the redis.');
    }
    catch (error) {
        logger.error('Could not connect to the redis.', error);
    }
};

export default redis;