const express = require('express');
const path = require('path');
const connectDB = require('./config/database');  // Importa la configuración de la base de datos

const app = express();

// Conexión a MongoDB
connectDB();

// Configuración de Multer para manejar archivos
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Importar rutas
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

require('dotenv').config();
