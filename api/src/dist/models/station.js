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
exports.exitStation = exports.enterStation = void 0;
const db_1 = __importDefault(require("../db"));
function enterStation(station, card_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.default.connect();
        try {
            yield client.query("BEGIN");
            const card = yield client.query("SELECT * FROM cards WHERE number = $1", [
                card_number,
            ]);
            if (card.rowCount === 0) {
                throw new Error("Card not found");
            }
            const fare = yield client.query("SELECT fare FROM train_lines WHERE $1 = ANY(stations)", [station]);
            if (fare.rowCount === 0) {
                throw new Error("Station not found");
            }
            const updatedCard = yield client.query("UPDATE cards SET balance = balance - $1 WHERE number = $2 RETURNING *", [fare.rows[0].fare, card_number]);
            const rideLog = yield client.query("INSERT INTO ride_logs (card_id, origin_station, enter_time) VALUES ($1, $2, NOW()) RETURNING *", [card.rows[0].id, station]);
            yield client.query("COMMIT");
            return updatedCard.rows[0];
        }
        catch (error) {
            yield client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.enterStation = enterStation;
function exitStation(station, card_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.default.connect();
        try {
            yield client.query("BEGIN");
            const card = yield client.query("SELECT * FROM cards WHERE number = $1", [
                card_number,
            ]);
            if (card.rowCount === 0) {
                throw new Error("Card not found");
            }
            const rideLog = yield client.query("UPDATE ride_logs SET destination_station = $1, exit_time = NOW() WHERE card_id = $2 AND exit_time IS NULL RETURNING *", [station, card.rows[0].id]);
            yield client.query("COMMIT");
            return card.rows[0];
        }
        catch (error) {
            yield client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.exitStation = exitStation;
