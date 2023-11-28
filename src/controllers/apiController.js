const Product = require('../models/Product');
const connectDB = require('../config/Databases');
const mongoose = require('mongoose');

// Controladores para operações CRUD
const createProduct = async (req, res) => {
  // Lógica de criação de produto

  const {produto, quantidade, verificar} = req.body

      if(!produto) {
        res.status(422).json({error:'o nome é obrigatorio'})
        return
  
      }
  
      if(!quantidade) {
        res.status(422).json({error:'o a quantidade é obrigatorio'})
        return
  
      }
  
      const product = {
        produto,
        quantidade,
        verificar
      }
  
      // Create 
  
      try {
  
        await Product.create(product)
  
        res.status(201).json({message: 'Produto inserida no sistema com sucesso!'})
        return
  
  
      } catch (error) {
        res.status(500).json({error: error})
      }
};

const getAllProducts = async (req, res) => {
  // Lógica para buscar todos os produtos
  try{

      const product = await Product.find()
      res.status(200).json(product)
    
    
    }catch (error) {
      res.status(500).json({error: error})
    }
    
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ message: 'ID do produto inválido!' });
    }

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: 'O produto não foi encontrado!' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {

  const id = req.params.id;
      const { produto, quantidade, verificar } = req.body;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(422).json({ message: 'ID do produto inválido!' });
      }
    
      const product = {
        produto,
        quantidade,
        verificar,
      };
    
      try {
        const updateProduct = await Product.updateOne({ _id: id }, product);
    
        if (updateProduct.nModified === 0) {
          return res.status(422).json({ message: 'Produto não encontrado ou não modificado!' });
        }
    
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
};

const deleteProduct = async (req, res) => {
  // Lógica para deletar um produto

    const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ message: 'ID do produto inválido!' });
  }

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(422).json({ message: 'Produto não encontrado ou não pode ser deletado!' });
    }

    await Product.deleteOne({ _id: id });
    return res.status(200).json({ message: 'O produto foi deletado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};