import express from "express";

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});