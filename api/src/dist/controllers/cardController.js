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
exports.createCard = void 0;
const card_1 = require("../models/card");
function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { number, amount } = req.body;
            const card = yield (0, card_1.createOrUpdateCard)(number, amount);
            res.status(201).json(card);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.createCard = createCard;
