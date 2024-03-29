require('dotenv').config();
const config = require('config');

const api = require("./routes");
const pages = require("./routesPage");

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

//подключил parser
const jsonBodyParser = express.json();
server.use(jsonBodyParser);
const cookieParser = require("cookie-parser");
server.use(cookieParser());

// api - тоді вже додамо api в роут, щоб чітко розрізняти що є сторінкою а що ні
server.use("/api/auth", api.routerAuth);

// TODO add /api/ and refactor internals
server.use("/users", api.routerUser);
server.use("/posts", api.routesPosts);
server.use("/comments", api.routesComment);
server.use("/image", api.routesImage);

//роутинг страниц
server.use("/", pages.routeMain);
server.use("/post-user", pages.routePostUser);
server.use("/register", pages.routeRegister);
server.use("/login", pages.routeLogIn);
server.use("/logout", pages.routeLogout);
server.use("/my-posts", pages.routeMyPosts);
server.use("/add-posts", pages.routeAddPost);
server.use("/admin", pages.routeAdmin);


