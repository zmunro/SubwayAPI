import express from "express";
import { createTrainLine } from "./controllers/trainLineController";
import { createCard } from "./controllers/cardController";
import { enter, exit } from "./controllers/stationController";
import { getRoute } from "./controllers/routeController";
import { connectWithRetry, createSchema } from "./dbUtils";

const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000;
const app = express();
app.use(express.json());

connectWithRetry();


createSchema();

app.post("/train-line", createTrainLine);
app.post("/card", createCard);
app.post("/station/:station/enter", enter);
app.post("/station/:station/exit", exit);
app.get("/route", getRoute);
app.get("/healthcheck", (req, res) => {
  res.send("Service is up and running!");
});

export const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
export default app;