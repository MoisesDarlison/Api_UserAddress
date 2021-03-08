import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import createConnection from "./config/database/configDB";
createConnection();

const { userRouter } = require("./routers/UserRoute");
const { addressRouter } = require("./routers/AddressRoute");
const { authRouter } = require("./routers/AuthRoute")

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/address', addressRouter);
app.use('/auth', authRouter)

export { app }