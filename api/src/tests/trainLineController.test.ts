import request from 'supertest';
import app from '../index';
import { server } from '../index';
import pool from '../db';
import { connectWithRetry, createSchema } from '../dbUtils'
import { QueryResult } from 'pg';
import { createTrainLineModel } from '../models/trainLine'

jest.mock('../models/trainLine', () => ({
  createTrainLineModel: jest.fn(),
}));

// Mock the 'createSchema' and 'connectWithRetry' functions
jest.mock('../dbUtils', () => ({
  createSchema: jest.fn(),
  connectWithRetry: jest.fn(),
}));

afterAll(() => {
  server.close();
});


// Mock the 'pool' object from the 'db.ts' file
jest.mock('../db');

// Create a mocked version of the 'pool.query()' method
pool.query = jest.fn();


beforeEach(() => {
  // Clear the mock calls before each test
  (pool.query as jest.Mock).mockClear();
});

describe('POST /train-line', () => {
  it('should create a new train line', async () => {
    // Mock the 'pool.query()' method to return a successful result
    (createTrainLineModel as jest.Mock).mockImplementationOnce(async () => {
      return { rows: [], rowCount: 1 };
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({} as QueryResult);

    const response = await request(app)
      .post('/train-line')
      .send({
        stations: ['Canal', 'Houston', 'Christopher', '14th'],
        name: '1',
        fare: 2.75,
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('message', 'Train line created successfully');
  });

  it('should return an error if the train line name is not unique', async () => {
    // Mock the 'pool.query()' method to return an error
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error('Unique constraint violation'));

    (createTrainLineModel as jest.Mock).mockImplementationOnce(async () => {
      throw new Error('Train line name is not unique');
    });

    const response = await request(app)
      .post('/train-line')
      .send({
        stations: ['Canal', 'Houston', 'Christopher', '14th'],
        name: '1',
        fare: 2.75,
      });

    expect(response.status).toEqual(500);
    expect(response.body).toHaveProperty('error');
  });
});
