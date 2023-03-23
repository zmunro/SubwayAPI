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
exports.getOptimalRoute = void 0;
const db_1 = __importDefault(require("../db"));
function getOptimalRoute(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.default.connect();
        try {
            const result = yield client.query('SELECT stations FROM train_lines');
            const trainLines = result.rows.map((row) => row.stations);
            let minStations = Infinity;
            let optimalRoute = [];
            for (const line of trainLines) {
                const originIndex = line.indexOf(origin);
                const destinationIndex = line.indexOf(destination);
                if (originIndex !== -1 && destinationIndex !== -1) {
                    const route = line.slice(Math.min(originIndex, destinationIndex), Math.max(originIndex, destinationIndex) + 1);
                    if (route.length < minStations) {
                        minStations = route.length;
                        optimalRoute = route;
                    }
                }
            }
            if (optimalRoute.length === 0) {
                throw new Error('No route found');
            }
            return optimalRoute;
        }
        catch (error) {
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.getOptimalRoute = getOptimalRoute;
