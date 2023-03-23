"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_PREFIX, POSTGRES_DB_NAME, POSTGRES_DB_HOST, POSTGRES_DB_PORT, PG_DATABASE_URL } = process.env;
const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}/${POSTGRES_DB_PREFIX}_${POSTGRES_DB_NAME}?sslmode=require`;
const pool = new pg_1.Pool({
    connectionString: PG_DATABASE_URL || connectionString,
});
exports.default = pool;
