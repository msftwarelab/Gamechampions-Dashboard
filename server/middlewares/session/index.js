import session from "express-session";
import { createClient } from 'redis'
import ConnectRedis from "connect-redis";

let cacheHostName = process.env.REDIS_CACHE_HOSTNAME;
let cacheKey = process.env.REDIS_CACHE_KEY;

const RedisStore = ConnectRedis(session);
const RedisClient = createClient({
  url: `redis://${cacheHostName}:6379`, 
  password: cacheKey
})

const SESSION_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

export const sessionMiddleware = session({
  store: new RedisStore({ client: RedisClient }),
  secret: ["auth", "language"],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: SESSION_EXPIRATION }
});
