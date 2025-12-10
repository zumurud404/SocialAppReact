import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const connectString = `mongodb+srv://admin:admin1234@postitcluster.eyi6zv1.mongodb.net/postITDb?appName=PostITCluster`;
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the current file path
const __dirname = dirname(__filename);

// Set up middleware to serve static files from the 'uploads' directory
// Requests to '/uploads' will serve files from the local 'uploads' folder
app.use("/uploads", express.static(__dirname + "/uploads"));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
// Create multer instance
const upload = multer({ storage: storage });

app.put(
  "/updateUserProfile/:email",
  upload.single("profilePic"),
  async (req, res) => {
    const email = req.params.email;
    const { name, password } = req.body;

    try {
      const userToUpdate = await UserModel.findOne({ email: email });
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update profile picture if a new one is uploaded
      if (req.file) {
        const newProfilePic = req.file.filename;

        // Delete old profile picture if exists
        if (userToUpdate.profilePic) {
          const oldFilePath = path.join(__dirname, "uploads", userToUpdate.profilePic);
          fs.unlink(oldFilePath, (err) => {
            if (err) console.error("Error deleting old file:", err);
            else console.log("Old profile picture deleted");
          });
        }

        userToUpdate.profilePic = newProfilePic;
      }

      // Update name if provided
      if (name) {
        userToUpdate.name = name;
      }

      // Update password if provided
      if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword;
      }

      await userToUpdate.save();

      res.status(200).json({
        user: userToUpdate,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;
    const post = new PostModel({
      postMsg:postMsg,
      email: email,   
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //using destructuring
    //search the user
    const user = await UserModel.findOne({ email: email });

    //if not found
    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //if everything is ok, send the user and message
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(3001,()=>
{
    console.log("Server connected!");
});
