const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const productRoutes = require('./src/routes/routes');
const connectDB = require('./src/config/Databases');

dotenv.config();
const app = express();

// Formatação JSON / Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitando CORS para todas as origens
app.use(cors());

// Rotas da API
app.use('/product', productRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' });
});

// Entregar uma porta
connectDB()
  .then(() => {
    app.listen(4000, () => {
      console.log('Servidor rodando na porta 4000');
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
  });
