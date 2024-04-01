require("dotenv").config();
const config = require("config");
const morgan = require("morgan");
const colors = require("colors/safe");

// const { router: routerUser } = require("./routes/routesUsers");
// const { router: routesPosts } = require("./routes/routesPosts");
// const { router: routesComment } = require("./routes/routesComment");
// const { router: routerAuth } = require("./routes/routerAuth");
// const { router: routesImage } = require("./routes/routesImage");

// const { router: routeMain } = require("./routesPage/routeMain");
// const { router: routePostUser } = require("./routesPage/routePostUser");
// const { router: routeRegister } = require("./routesPage/routeRegister");
// const { router: routeLogIn } = require("./routesPage/routeLogIn");
// const { router: routeMyPosts } = require("./routesPage/routeMyPosts");
// const { router: routeLogout } = require("./routesPage/routeLogout");
// const { router: routeAddPost } = require("./routesPage/routeAddPost");
// const { router: routeAdmin } = require("./routesPage/routeAdmin");

const api = require("./routes");
const pages = require("./routesPage");

//подключил сервер
const express = require("express");
const server = express();
const { port } = config.server;
server.listen(port, () => console.log(`server start port ${port}`));

//подключил pug
server.use("/public", express.static("static"));
server.set("view engine", "pug");
server.set("views", "pages");

//подключил parser
const jsonBodyParser = express.json();
server.use(jsonBodyParser);
const cookieParser = require("cookie-parser");
server.use(cookieParser());

//подключил morgan
morgan.token("errorMessage", function (req, res) {
  return req.error || "";
});
server.use(
  morgan(
    `:method ${colors.bgGreen(`:url`)} ${colors.bgYellow(
      `:status`
    )} ${colors.bgRed(`:errorMessage`)}`
  )
);

//api
// server.use("/api/auth", api.routerAuth);
// server.use("/users", api.routerUser);
// server.use("/posts", api.routesPosts);
// server.use("/comments", api.routesComment);
// server.use("/image", api.routesImage);

server.use("/api/auth", api.routerAuth);
server.use("/api/users", api.routerUser);
server.use("/api/posts", api.routesPosts);
server.use("/api/comments", api.routesComment);
server.use("/api/image", api.routesImage);

//роутинг страниц
server.use("/", pages.routeMain);
server.use("/post-user", pages.routePostUser);
server.use("/register", pages.routeRegister);
server.use("/login", pages.routeLogIn);
server.use("/logout", pages.routeLogout);
server.use("/my-posts", pages.routeMyPosts);
server.use("/add-posts", pages.routeAddPost);
server.use("/admin", pages.routeAdmin);
