const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mahadikvinayak75:G5s9KGPTdYfXGJLT@cluster0.0wt0wpv.mongodb.net/test_data"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  courseId: String,
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const CoursePurchaseSchema = new mongoose.Schema({
  courseId: [],
  username: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const CoursePurchase = mongoose.model("CoursePurchase", CoursePurchaseSchema);

module.exports = {
  Admin,
  User,
  Course,
  CoursePurchase,
};
