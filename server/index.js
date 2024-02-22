import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import token from "./voiceToken.js";
import { handleCall, handleFallBackResponse } from "./handleCall.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
dotenv.config();

app.post("/token", token);
app.post("/agent/voice", handleCall);
app.post("/fall-back", handleFallBackResponse);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});