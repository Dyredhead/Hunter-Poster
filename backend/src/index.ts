import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./env.js";

import {
    imagesRouter,
    loginRouter,
    postRouter,
    registerRouter,
    settingsRouter,
    usersRouter,
} from "@/routes/index.js";
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("combined"));

// Routes
app.use(loginRouter);
app.use(registerRouter);
app.use(postRouter);
app.use(usersRouter);
app.use(imagesRouter);
app.use(settingsRouter);

app.listen(env.express_port, () => {
    console.log(`Backend running at http://localhost:${env.express_port}`);
});
