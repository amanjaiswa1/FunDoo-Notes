import { client } from "../config/redis";
import logger from '../config/logger';

export const redisGetAll = async (req, res, next) => {
    const value = await client.get('getAllData');

    if (value != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: "Redis: All notes fetched successfully"
        });
        logger.info('Redis: All notes fetched successfully');
    }
    else {
        next();
    }
}