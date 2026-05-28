
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://masapenev2005_db_user:<db_password>@cluster0.x07ngos.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));