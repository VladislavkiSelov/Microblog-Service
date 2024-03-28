const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type:String,required: true},
  email: {type:String,required: true},
  password: {type:String,required: true}
});

const adminSchema = new mongoose.Schema({
  username: {type:String,required: true},
  email: {type:String,required: true},
  password: {type:String,required: true},
});

const postsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", require:true },
  titel: {type:String,required: true},
  description: {type:String,required: true},
});

const commentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "posts", require:true},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", require:true},
  comment: {type:String,required: true},
});

const imageSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  image: String,
});

const User = mongoose.model("users", userSchema);
const Post = mongoose.model("posts", postsSchema);
const Comment = mongoose.model("comments", commentSchema);
const Admin = mongoose.model("admins", adminSchema);
const Image = mongoose.model("images", imageSchema);

const mongoUrl = `mongodb+srv://vladislav:${process.env.DB_PASS}@microblog-service.h5anqze.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function init() {
  try {
    await mongoose.connect(mongoUrl, { dbName: "microblog" });
    console.log("mongo good");
  } catch (err) {
    console.log(err);
  }
}

init();

module.exports = {
  User,
  Post,
  Comment,
  Admin,
  Image,
};
