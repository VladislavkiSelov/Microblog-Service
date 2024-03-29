require('dotenv').config();
const config = require('config');

const { router: routerUser } = require("./routes/routesUsers");
const { router: routesPosts } = require("./routes/routesPosts");
const { router: routesComment } = require("./routes/routesComment");
const { router: routerAuth } = require("./routes/routerAuth");
const { router: routesImage } = require("./routes/routesImage");

const { router: routeMain } = require("./routesPage/routeMain");
const { router: routePostUser } = require("./routesPage/routePostUser");
const { router: routeRegister } = require("./routesPage/routeRegister");
const { router: routeLogIn } = require("./routesPage/routeLogIn");
const { router: routeMyPosts } = require("./routesPage/routeMyPosts");
const { router: routeLogout } = require("./routesPage/routeLogout");
const { router: routeAddPost } = require("./routesPage/routeAddPost");
const { router: routeAdmin } = require("./routesPage/routeAdmin");

//подключил сервер
const express = require("express");
const server = express();

//! краще мати можливість перевизначати порт динамічно, через енв
const { port } = config.server;
server.listen(port, () => console.log(`server start port ${port}`));

//подключил pug
server.use("/public", express.static("static"));
server.set("view engine", "pug");
server.set("views", "pages");

//подключил cors
const cors = require("cors");
server.use(cors({ origin: process.env.DB_HOST }));

//подключил parser
const jsonBodyParser = express.json();
server.use(jsonBodyParser);
const cookieParser = require("cookie-parser");
server.use(cookieParser());

//api
server.use("/auth", routerAuth);
server.use("/users", routerUser);
server.use("/posts", routesPosts);
server.use("/comments", routesComment);
server.use("/image", routesImage);

//роутинг страниц
server.use("/", routeMain);
server.use("/post-user", routePostUser);
server.use("/register", routeRegister);
server.use("/login", routeLogIn);
server.use("/logout", routeLogout);
server.use("/my-posts", routeMyPosts);
server.use("/add-posts", routeAddPost);
server.use("/admin", routeAdmin);


