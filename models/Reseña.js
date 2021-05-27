var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var resenaSchema = new Schema({
  ID:    { type: String },
  ID_Usuario:     { type: String },
  ID_Contenido:  { type: String },
  Fecha: { type: Date },
  Calificacion:  { type: Number }
});

module.exports = mongoose.model('Resena', resenaSchema);