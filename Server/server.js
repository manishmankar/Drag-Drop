const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Files = require("./model/files");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/files", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected");
});

app.get("/", (req, resp) => {
  Files.find()
    .exec()
    .then((result) => {
      console.log(result);
      resp.status(200).send(result);
    })
    .catch((err) => {
      resp.status(500).send(err);
    });
});

app.post("/files", (req, res) => {
  const files = new Files({
    _id: new mongoose.Types.ObjectId(),
    file: req.body.file,
  });
  files
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: "succesfully submitted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error occured" });
    });
});

app.listen(5000, () => {
  console.log("connect to port 5000 ");
});
