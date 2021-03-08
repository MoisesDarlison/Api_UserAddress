import { parse } from 'dotenv/types';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

class AuthMid {
    async verifyJWT(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            return res.status(401).json({ massage: "Token not provided" });
        }

        const [, authorization] = req.headers.authorization.split(' ');
        jwt.verify(authorization, `${SECRET_KEY}`, (err, decode) => {
            if (err) {
                return res.status(401).json({ massage: "Not Authorized" });
            }

            const decodeForString = JSON.stringify(decode).toString().split('"', 5);

            req.userId = decodeForString[3];

            next();
        });
    }
}
export { AuthMid };
