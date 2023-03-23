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
exports.connectWithRetry = exports.createSchema = void 0;
// src/dbUtils.ts
const db_1 = __importDefault(require("./db"));
const path_1 = require("path");
const fs_1 = require("fs");
function createSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.default.connect();
        try {
            const schemaPath = (0, path_1.join)(__dirname, 'schema.sql');
            const schemaSql = (0, fs_1.readFileSync)(schemaPath, 'utf8');
            yield client.query(schemaSql);
        }
        catch (error) {
            console.error('Error creating schema:', error);
        }
        finally {
            client.release();
        }
    });
}
exports.createSchema = createSchema;
const connectWithRetry = () => {
    console.log('Attempting to connect to the database...');
    db_1.default
        .connect()
        .then(() => {
        console.log('Connected to the database successfully');
    })
        .catch((error) => {
        console.error('Failed to connect to the database:', error);
        console.log('Retrying in 5 seconds...');
        setTimeout(exports.connectWithRetry, 5000);
    });
};
exports.connectWithRetry = connectWithRetry;
