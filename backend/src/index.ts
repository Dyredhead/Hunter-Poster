import express from "express";
import cors from "cors";
import { env } from "./env.js";
import morgan from "morgan";

import loginRouter from "@/routes/auth/login.js";
import registerRouter from "@/routes/auth/register.js";
import postRouter from "@/routes/posts.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

// Routes
app.use(loginRouter);
app.use(registerRouter);
app.use(postRouter);

app.listen(env.express_port, () => {
    console.log(`Backend running at http://localhost:${env.express_port}`);
});
