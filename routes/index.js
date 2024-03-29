const { router: routerUser } = require("./routesUsers");
const { router: routesPosts } = require("./routesPosts");
const { router: routesComment } = require("./routesComment");
const { router: routerAuth } = require("./routerAuth");
const { router: routesImage } = require("./routesImage");

module.exports = {
  routerUser,
  routesPosts,
  routesComment,
  routerAuth,
  routesImage
}