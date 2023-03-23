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
exports.exit = exports.enter = void 0;
const station_1 = require("../models/station");
function enter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { card_number } = req.body;
            const station = req.params.station;
            const updatedCard = yield (0, station_1.enterStation)(station, card_number);
            res.status(200).json(updatedCard);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.enter = enter;
function exit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { card_number } = req.body;
            const station = req.params.station;
            const updatedCard = yield (0, station_1.exitStation)(station, card_number);
            res.status(200).json(updatedCard);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.exit = exit;
