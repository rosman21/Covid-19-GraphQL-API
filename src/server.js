import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { createIntent, deleteIntent, listIntents } from './controllers/intents';
import {
  createKnowledgeBase,
  deleteKnowledgeBase,
  listKnowledgeBases,
  getKnowledgeBase
} from './controllers/knowledgeBase';
const PORT = 8080 || process.env.PORT;
export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/list/:value', async (req, res) => {
  const value = req.params.value;
  if (value === 'intents') {
    const response = await listIntents();
    res.send(response);
  } else if (value === 'knowledgeBases') {
    const response = await listKnowledgeBases();
    res.send(response);
  } else {
    res.send({
      message: `${value} is not a valid parameter. Please use intents or knowledgeBases`
    });
  }
});

export const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
