// server.js
const express = require("express");
const next = require("next");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const redisClient = new Redis(process.env.REDIS_URL);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: "sid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: !dev,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day default
  },
});

app.prepare().then(() => {
  const server = express();

  server.use(helmet());
  server.use(cookieParser());
  server.use(sessionMiddleware); // ✅ attach session middleware globally

  // Pass all requests to Next.js
  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`✅ Ready on http://localhost:${port}`);
  });
});
