import express from "express";
import api from "./api";

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.static('static'));

app.use(api);

app.listen(port, () => {
  	console.log(`Server running on http://localhost:${port}`);
});