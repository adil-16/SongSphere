const express = require("express");
const cors = require("cors");
const db = require("./config/db"); 
const userRoutes = require('./routes/user');
const playlistRoutes = require('./routes/playlist');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/api/user', userRoutes);
app.use('/api/playlist', playlistRoutes);

try {
    const firestore = db;
    if (firestore) {
      console.log("Connected to Firebase successfully!");
    } else {
      console.log("Failed to connect to Firebase.");
    }
  } catch (error) {
    console.log("Firebase connection error:", error);
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });