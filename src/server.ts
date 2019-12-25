import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express, { Response } from "express";
import morgan from "morgan";

import { developmentErrors, productionErrors } from "./helpers/errorHandlers";
import router from "./routes";

const app = express();
app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);

app.use("/api", router);

app.get("/health", (_, res: Response) => {
  res.status(200).send();
});

app.use("*", (_, res: Response) => res.status(404).send());

if (app.get("env") === "development") {
  app.use(developmentErrors);
}

app.use(productionErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://locahost:${PORT}`)
);
