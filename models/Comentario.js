var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var comentarioSchema = new Schema({
  ID:    { type: String },
  ID_Usuario:     { type: String },
  ID_Resena:  { type: String },
  Fecha: { type: Date },
  Comentario:  { type: String },
});

module.exports = mongoose.model('Comentario', comentarioSchema);
