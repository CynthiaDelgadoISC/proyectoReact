var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var contenidoSchema = new Schema({
  ID:    { type: String },
  Titulo:     { type: String },
  Categoria:  { type: String },
  URL_Imagen: {type:String}
});

module.exports = mongoose.model('Contenido', contenidoSchema);
