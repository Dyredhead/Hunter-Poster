import express from 'express';
import {env} from './env.js'
// import healthRouter from './routes/health.ts';
// import usersRouter from './routes/users.js';
// import { usersContract } from '@my-app/shared';

const app = express();

app.use(express.json());

// app.use(healthRouter);
// app.use(usersContract.mount, usersRouter);

app.listen(env.express_port, () => {
  console.log(`Backend running at http://localhost:${env.express_port}`);
});
