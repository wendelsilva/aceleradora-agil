import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const bookController = require('./book/Controller')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/', bookController);

app.listen(process.env.PORT || 3333 , () => {
    console.log('HTTP Server listening on port' + 3333);
})