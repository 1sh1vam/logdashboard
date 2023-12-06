import express, { Request, Response } from "express";
import { query, validationResult } from 'express-validator';
import { LogModel } from "./models/log";
import { RequestWithQuery } from "../types/request";

const app = express.Router();

app.post("/logs", async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Simulating status, errorMsg, request, response for the log
    const status: 'success' | 'failed' = Math.random() < 0.5 ? 'success' : 'failed';
    const errorMsg: string | undefined = status === 'failed' ? 'Some error occurred' : undefined;
    const request: object = { method: 'GET', endpoint: '/logs', body: req.body };
    const response: object = { status: status === 'success' ? 'OK' : 'Error' };

    const newLog = new LogModel({ userId, status, errorMsg, request, response });

    await newLog.save();
    res.status(201).json({ message: 'Log created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating log' });
  }
});


type GetLogsQueryT = {
  from: number;
  to: number;
}

app.get(
  "/logs",
  [query("from").trim().toInt(), query("to").trim().toInt()],
  async (req: RequestWithQuery<GetLogsQueryT>, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    
    const { from, to } = req.query;
    console.log('from', 'to', { from, to })
    let query = { createdAt: { $gte: new Date(from), $lte: new Date(to) } };

    try {
      const logs = await LogModel.find(query);
      res.status(200).json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving logs" });
    }
  }
);


export { app as logRoute };
