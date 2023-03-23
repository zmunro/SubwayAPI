"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const trainLineController_1 = require("./controllers/trainLineController");
const cardController_1 = require("./controllers/cardController");
const stationController_1 = require("./controllers/stationController");
const routeController_1 = require("./controllers/routeController");
const dbUtils_1 = require("./dbUtils");
const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dbUtils_1.connectWithRetry)();
(0, dbUtils_1.createSchema)();
app.post("/train-line", trainLineController_1.createTrainLine);
app.post("/card", cardController_1.createCard);
app.post("/station/:station/enter", stationController_1.enter);
app.post("/station/:station/exit", stationController_1.exit);
app.get("/route", routeController_1.getRoute);
app.get("/healthcheck", (req, res) => {
    res.send("Service is up and running!");
});
exports.server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
exports.default = app;
