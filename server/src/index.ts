import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { logRoute } from './routes';

const app = express();

app.use(express.json());

app.use(logRoute);

app.all('*', (req: Request, res: Response) => {
    return res.status(400).send('Not found.');
})

const start = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err) {
        console.log('Error connecting to the mongo', err);
    }

    app.listen(3000, () => {
        console.log('Listening on port number 3000');
    })
}

start();