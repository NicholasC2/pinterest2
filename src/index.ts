import express from "express";
import api from "./api";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(api);
app.use(express.static(path.join(__dirname, '../static')));

app.use((req, res) => {
  	res.status(404).sendFile(path.join(__dirname, '../static', '404.html'));
});

app.listen(port, () => {
  	console.log(`Server running on http://localhost:${port}`);
});