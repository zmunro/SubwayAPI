import request from "supertest";
import app from "../index";
import { server } from "../index"
import * as trainLineModel from "../models/trainLine";
import * as db from "../db";


jest.mock("../db");

afterAll(() => server.close());

const trainLineModelSpy = jest.spyOn(trainLineModel, 'createTrainLineModel');
beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /train-line", () => {
    it("should create a new train line", async () => {
    // Mock the trainLineModel.createTrainLineModel() method to return a successful result
    const mockCreateTrainLineModel = trainLineModelSpy.mockImplementationOnce(() => {
      return Promise.resolve({ rows: [], rowCount: 1 })
    });

    const response = await request(app).post("/train-line").send({
      stations: ["station1", "station2"],
      name: "train1",
      fare: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Train line created successfully" });

    expect(mockCreateTrainLineModel).toHaveBeenCalledTimes(1);
    expect(mockCreateTrainLineModel).toHaveBeenCalledWith(["station1", "station2"], "train1", 10);
  });

  it("should return an error if the train line name is not unique", async () => {
    // Mock the trainLineModel.createTrainLineModel() method to throw an error
    
    const mockCreateTrainLineModel = trainLineModelSpy.mockImplementationOnce(async () => {
      throw new Error("Train line name is not unique");
    });

    const response = await request(app).post("/train-line").send({
      stations: ["station1", "station2"],
      name: "train1",
      fare: 10,
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Train line name is not unique" });

    expect(mockCreateTrainLineModel).toHaveBeenCalledTimes(1);
    expect(mockCreateTrainLineModel).toHaveBeenCalledWith(["station1", "station2"], "train1", 10);
  });
});
