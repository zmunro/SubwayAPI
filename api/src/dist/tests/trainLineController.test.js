"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const trainLineModel = __importStar(require("../models/trainLine"));
jest.mock("../dbUtils");
jest.mock("../db");
afterAll(() => index_2.server.close());
const trainLineModelSpy = jest.spyOn(trainLineModel, 'createTrainLineModel');
beforeEach(() => {
    jest.clearAllMocks();
});
describe("POST /train-line", () => {
    it("should create a new train line", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the trainLineModel.createTrainLineModel() method to return a successful result
        const mockCreateTrainLineModel = trainLineModelSpy.mockImplementationOnce(() => {
            return Promise.resolve({ rows: [], rowCount: 1 });
        });
        const response = yield (0, supertest_1.default)(index_1.default).post("/train-line").send({
            stations: ["station1", "station2"],
            name: "train1",
            fare: 10,
        });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "Train line created successfully" });
        expect(mockCreateTrainLineModel).toHaveBeenCalledTimes(1);
        expect(mockCreateTrainLineModel).toHaveBeenCalledWith(["station1", "station2"], "train1", 10);
    }));
    it("should return an error if the train line name is not unique", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the trainLineModel.createTrainLineModel() method to throw an error
        const mockCreateTrainLineModel = trainLineModelSpy.mockImplementationOnce(() => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error("Train line name is not unique");
        }));
        const response = yield (0, supertest_1.default)(index_1.default).post("/train-line").send({
            stations: ["station1", "station2"],
            name: "train1",
            fare: 10,
        });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Train line name is not unique" });
        expect(mockCreateTrainLineModel).toHaveBeenCalledTimes(1);
        expect(mockCreateTrainLineModel).toHaveBeenCalledWith(["station1", "station2"], "train1", 10);
    }));
});
