import { client } from "../config/redis";

export const redisGetAll = async (req, res, next) => {
    const value = await client.get('getAllData');

    if (value != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: "Redis: All notes fetched successfully"
        });
    }
    else {
        next();
    }
}