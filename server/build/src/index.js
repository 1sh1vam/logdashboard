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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.logRoute);
app.all('*', (req, res) => {
    return res.status(400).send('Not found.');
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined');
        }
        yield mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (err) {
        console.log('Error connecting to the mongo', err);
    }
    app.listen(3000, () => {
        console.log('Listening on port number 3000');
    });
});
start();
