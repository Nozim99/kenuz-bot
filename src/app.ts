import express from 'express';

const app = express();

app.use(express.json());

import './events/message/index.message';
import './events/callback_query/index.query';