const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MAP GLOBAL PROMISE - get rid of warning when you run the server
mongoose.Promise = global.Promise;

//DB config
const db = require('./config/database');

//CONNECT TO MONGOOSE
mongoose
  .connect(db.mongoURI, {
    autoReconnect: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  // //to destroy session when inactive use these (resave: true, rolling: true, expires: 30 * 1000[30seconds])
  // app.use(
  //   session({
  //     secret: "some BRIYM distin",
  //     resave: true,
  //     rolling: true,
  //     saveUninitialized: false,
  //     store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //     // Date.now() + 60 * 60 * 12 * 1000
  //     cookie: {
  //       // maxAge:  60 * 60 * 12
  //       expires: 60 * 1000
  //     }
  //   })
  // );

//setting up the templates
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

//Use routes
app.use(require("./routes/WorksRoute"));
app.use(require("./routes/PagesRoute"));
// app.use(require("./routes/routes"));

//404 handler
app.use((req, res, next) => {
  const error = new Error("Page not found!!!!");
  error.status = 404;
  return next(error);
});

//main error handler
app.use((error, req, res, next) => {
    return res.status(error.status || 500).render("error", { error });
});

const port = 3001 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
