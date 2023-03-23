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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const index_2 = require("../index");
const db_1 = __importDefault(require("../db"));
const trainLine_1 = require("../models/trainLine");
jest.mock('../models/trainLine', () => ({
    createTrainLineModel: jest.fn(),
}));
// Mock the 'createSchema' and 'connectWithRetry' functions
jest.mock('../dbUtils', () => ({
    createSchema: jest.fn(),
    connectWithRetry: jest.fn(),
}));
afterAll(() => {
    index_2.server.close();
});
// Mock the 'pool' object from the 'db.ts' file
jest.mock('../db');
// Create a mocked version of the 'pool.query()' method
db_1.default.query = jest.fn();
beforeEach(() => {
    // Clear the mock calls before each test
    db_1.default.query.mockClear();
});
describe('POST /train-line', () => {
    it('should create a new train line', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the 'pool.query()' method to return a successful result
        trainLine_1.createTrainLineModel.mockImplementationOnce(() => __awaiter(void 0, void 0, void 0, function* () {
            return { rows: [], rowCount: 1 };
        }));
        db_1.default.query.mockResolvedValueOnce({});
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/train-line')
            .send({
            stations: ['Canal', 'Houston', 'Christopher', '14th'],
            name: '1',
            fare: 2.75,
        });
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('message', 'Train line created successfully');
    }));
    it('should return an error if the train line name is not unique', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the 'pool.query()' method to return an error
        db_1.default.query.mockRejectedValueOnce(new Error('Unique constraint violation'));
        trainLine_1.createTrainLineModel.mockImplementationOnce(() => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error('Train line name is not unique');
        }));
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/train-line')
            .send({
            stations: ['Canal', 'Houston', 'Christopher', '14th'],
            name: '1',
            fare: 2.75,
        });
        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('error');
    }));
});
