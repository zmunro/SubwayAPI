import express from 'express';
import { createTrainLine } from './controllers/trainLineController';
import { createCard } from './controllers/cardController';
import { enter, exit } from './controllers/stationController';
import { getRoute } from './controllers/routeController';
import { connectWithRetry, createSchema } from './db';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

connectWithRetry()
  .then(() => {
    console.log('Connected to the database successfully');
    // Start the server after a successful connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

createSchema().then(() => {
  console.log('Schema created successfully');
}).catch((error) => {
  console.error('Error creating schema:', error);
});


app.use(express.json());

app.post('/train-line', createTrainLine);
app.post('/card', createCard);
app.post('/station/:station/enter', enter);
app.post('/station/:station/exit', exit);
app.get('/route', getRoute);
app.get("/health-check", (req, res) => {
  res.send("Service is up and running!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




