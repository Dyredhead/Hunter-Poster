import express from "express";
import healthRouter from "./routes/health.js";
import usersRouter from "./routes/users.js";
import { usersContract } from "@my-app/shared";

const app = express();
const port = 3001;

app.use(express.json());

app.use(healthRouter);
app.use(usersContract.mount, usersRouter);

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
