import express from 'express';
import {json, urlencoded} from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const PORT = 8080 || process.env.PORT;
export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(morgan('dev'));

export const start = async() => {
  try {
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
