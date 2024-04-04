const { db } = require("config");
const mongoose = require("mongoose");
let Grid = require("gridfs-stream");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const postsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  titel: { type: String, required: true },
  description: { type: String, required: true },
});

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  comment: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
const Post = mongoose.model("posts", postsSchema);
const Comment = mongoose.model("comments", commentSchema);
const Admin = mongoose.model("admins", adminSchema);

const mongoUrl = `mongodb${db.connectionFormat}://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, { dbName: db.name });
const conn = mongoose.connection;

// Инициализация GridFS-Storage
let gfs;
conn.once("open", () => {
  // Инициализация потока GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

module.exports = {
  User,
  Post,
  Comment,
  Admin,
  gfs,
  mongoUrl,
};
