"use strict";

import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import { create } from "express-handlebars";
import handlebars from "handlebars";
import bodyParser from "body-parser";
import compression from "compression";
import configuration from "~config";

import {
  authMiddleware,
  sessionMiddleware,
  ssrMiddleware,
  errorMiddleware,
  requireHttps,
  logMiddleware,
  redirectMiddleware,
  languageCheckMiddleware
} from "./server/middlewares";
import {
  createSessionHandler,
  deleteSessionHandler,
  changeLanguageHandler,
  goMapsHandler
} from "./server/handlers";
import { expressConfig } from "./server/config";

const UMBRACO_API_URL = `${configuration.umbracoApiUrl}`;
const isUnderMaintenance = process.env.UNDER_MAINTENANCE;

const app = express();

// const languageRedirectionMiddleware = (req, res, next) => {
//   const { url } = req;
//   const languages = ["en", "de", "es", "fr", "it", "pt", "kr", "nl", "jp"];

//   // Check if the URL does not end with a trailing slash and doesn't include /arena
//   if (languages.some(lang => url === `/${lang}/`) && !url.includes("/arena")) {
//     return res.redirect(`${url}arena`);
//   } else if (
//     languages.some(lang => url === `/${lang}`) &&
//     !url.includes("/arena")
//   ) {
//     return res.redirect(`${url}/arena`);
//   }

//   // Proceed to the next middleware if the URL doesn't match the condition
//   next();
// };

app.use(logMiddleware);

app.use(redirectMiddleware);

// app.use(languageRedirectionMiddleware);

app.use(compression());

const viewsDir = "./server/templates";

// setup express to use handlebars as the templating engine
const hbs = create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
  partialsDir: path.join(__dirname, `${viewsDir}/partials`),
  extname: ".hbs"
});

// allows partials to be organised in subfolders
hbs
  .getTemplates(path.join(__dirname, `${viewsDir}/partials`))
  .then(function(partials) {
    for (let partial in partials) {
      handlebars.registerPartial(partial, "{{" + partial + "}}");
    }
  })
  .catch(error => {
    console.log(`Unable to retrieve templates. Error: ${error}`);
  });

app.set("views", path.join(__dirname, `${viewsDir}`));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("etag", false);

// setup server for static assets
app.use("/", express.static(path.join(__dirname, "dist"), { etag: false }));

app.get("/", function(req, res) {
  res.redirect("/en/arena");
});

app.get("/go/:key", function(req, res, next) {
  goMapsHandler(req, res, next);
});

app.get("/robots.txt", function(req, res) {
  let robotResponse = "User-agent: *\nDisallow:\n";

  if (req.headers.host.includes("play.gamechampions")) {
    robotResponse = "User-agent: *\nDisallow: /\nNOINDEX: /";
  }

  res.type("text/plain");
  res.send(robotResponse);
});

app.get("/ads.txt", (req, res) => {
  const adsTxtPath = path.join(__dirname, "ads.txt");
  const absoluteAdsTxtPath = path.resolve(adsTxtPath);

  res.sendFile(absoluteAdsTxtPath);
});

//if request url matches /media/* then redirect to API_URL/media/*
app.use((req, res, next) => {
  const regex = new RegExp("/media/[^/]+");

  if (regex.test(req.url)) {
    return res.redirect(UMBRACO_API_URL.concat(req.url));
  }
  next();
});

// https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// require HTTPS
app.use(requireHttps);

// Setup body parser for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (isUnderMaintenance) {
    res.status(500);
    res.render("500", { layout: false });
  } else {
    next();
  }
});

app.use(sessionMiddleware);

app.post("/createSession", createSessionHandler);

app.post("/deleteSession", deleteSessionHandler);

app.post("/changeLanguage", changeLanguageHandler);

app.use(languageCheckMiddleware);

app.use(authMiddleware);

app.use(ssrMiddleware);

app.use(errorMiddleware);

// use the environment's port or a random port
const defaultPort = process.env.IS_DEV
  ? 3000
  : Math.floor(Math.random() * (65535 - 1024)) + 1024;
const port = process.env.PORT ? parseInt(process.env.PORT) : defaultPort;

const defaultHttpsPort = process.env.IS_DEV
  ? 6001
  : Math.floor(Math.random() * 65535) + 1024;
let httpsPort = process.env.HTTPS_PORT
  ? parseInt(process.env.HTTPS_PORT)
  : defaultHttpsPort;
while (httpsPort === port) httpsPort = Math.floor(Math.random() * 65535) + 1024;

app.listen(port, () => {
  console.log(`Running ${expressConfig.environment} on localhost:${port}`);
});

if (expressConfig.isHttps) {
  const options = {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server.pem"),
    requestCert: false,
    rejectUnauthorized: false
  };

  https.createServer(options, app).listen(httpsPort, () => {
    console.log(
      `Running ${expressConfig.environment} (HTTPS) on localhost:${httpsPort}`
    );
  });
}

export default app;
