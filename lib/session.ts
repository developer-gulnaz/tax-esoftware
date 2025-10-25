// import session from "express-session";
// import MongoStore from "connect-mongo";

// export const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || "supersecretkey",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 1000 * 60 * 60, // 1 hour
//     sameSite: "lax",
//   },
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI!,
//     collectionName: "sessions",
//   }),
// });
