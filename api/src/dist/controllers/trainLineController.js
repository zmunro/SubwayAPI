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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrainLine = void 0;
const trainLine_1 = require("../models/trainLine");
function createTrainLine(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { stations, name, fare } = req.body;
            const trainLine = yield (0, trainLine_1.createTrainLineModel)(stations, name, fare);
            res.status(201).json({ message: 'Train line created successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.createTrainLine = createTrainLine;
