import express from 'express';
import { getIndexes, pushNewIndex } from './indexController.mjs';
const indexRouter = express.Router();

indexRouter.get('/indexes', getIndexes);

indexRouter.post('/indexes/post/', pushNewIndex);

export { indexRouter };
