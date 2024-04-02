const { router: routeMain } = require("./routeMain");
const { router: routePostUser } = require("./routePostUser");
const { router: routeRegister } = require("./routeRegister");
const { router: routeLogIn } = require("./routeLogIn");
const { router: routeMyPosts } = require("./routeMyPosts");
const { router: routeLogout } = require("./routeLogout");
const { router: routeAddPost } = require("./routeAddPost");
const { router: routeEditPost } = require("./routeEditPost");
const { router: routeAdmin } = require("./routeAdmin");

module.exports = {
  routeMain,
  routePostUser,
  routeRegister,
  routeLogIn,
  routeLogout,
  routeMyPosts,
  routeAddPost,
  routeAdmin,
  routeEditPost
}