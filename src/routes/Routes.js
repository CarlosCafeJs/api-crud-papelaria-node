const express = require('express');
const router = express.Router();
const productController = require('../controllers/apiController');

// Rotas da API - CREATE (Criação dos dados)
router.post('/', productController.createProduct);

// Rotas da API - READY (Leitura dos dados)
router.get("/", productController.getAllProducts);

router.get("/id/:id", productController.getProductById);

// Rotas da API - UPDATE (Atualização dos dados)
router.patch("/:id", productController.updateProduct);

// Rotas da API - DELETE (Deletar dados)
router.delete("/:id", productController.deleteProduct);

module.exports = router;
