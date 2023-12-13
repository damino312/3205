import express from 'express';
import cors from 'cors';
import search from './search.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

app.use(search);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
