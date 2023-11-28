const mongoose = require('mongoose')
const Product = mongoose.model('Product',{
  produto: String,
  quantidade: Number, 
  verificar: Boolean,

})

module.exports = Product