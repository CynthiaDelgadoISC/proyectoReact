var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
  ID:    { type: String },
  Nombre:     { type: String },
  Apellido:  { type: String },
  Fecha_Nacimiento: { type: Date },
  Correo:  { type: String },
  Contrasena: {type: String},
  URL_Imagen: {type:String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);
