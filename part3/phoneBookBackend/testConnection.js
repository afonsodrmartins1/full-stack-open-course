require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error('Erro de conexão:', error)
  })