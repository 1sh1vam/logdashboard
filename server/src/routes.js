"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoute = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const log_1 = require("./models/log");
const app = express_1.default.Router();
exports.logRoute = app;
app.post("/logs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        // Simulating status, errorMsg, request, response for the log
        const status = Math.random() < 0.5 ? 'success' : 'failed';
        const errorMsg = status === 'failed' ? 'Some error occurred' : undefined;
        const request = { method: 'GET', endpoint: '/logs', body: req.body };
        const response = { status: status === 'success' ? 'OK' : 'Error' };
        const newLog = new log_1.LogModel({ userId, status, errorMsg, request, response });
        yield newLog.save();
        res.status(201).json({ message: 'Log created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating log' });
    }
}));
app.get("/logs", [(0, express_validator_1.query)("from").trim().toInt(), (0, express_validator_1.query)("to").trim().toInt()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const { from, to } = req.query;
    console.log('from', 'to', { from, to });
    let query = { createdAt: { $gte: new Date(from), $lte: new Date(to) } };
    try {
        const logs = yield log_1.LogModel.find(query);
        res.status(200).json(logs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving logs" });
    }
}));
