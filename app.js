import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/Visitors",
  { useNewUrlParser: true }
);
mongoose.connection.on("error", function (e) {
  console.error(e);
});

app.use(express.urlencoded());

const schema = {
  date: Date,
  name: String,
};

const Visitor = mongoose.model("Visitor", schema);

app.get("/", (req, res) => {
  let name =
    req.query.name == undefined || req.query.name == ""
      ? "Anónimo"
      : req.query.name;
  const newVisitor = {};
  const date = Date.now();
  newVisitor.name = name;
  newVisitor.date = date;
  const visitor = new Visitor(newVisitor);
  visitor.save((err, visitor) => {
    if (err) res.sendStatus(500);
    res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
