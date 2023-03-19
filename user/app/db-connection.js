const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://polygony:nima1381@cluster0.hdjlm.mongodb.net/mydb")
  .then(() => {
    console.log("database connect successfully");
  })
  .catch(() => {
    console.log("database not connected");
  });
