import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server  is At Running at port 3000  htr");
});

app.get("/", (req, res) => {});
