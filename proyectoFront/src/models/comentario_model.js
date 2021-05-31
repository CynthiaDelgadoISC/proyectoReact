import {ModelDto} from './data_model.js';
import ReviewDto from './reseña_model';
import UsuarioDto from './usuario_model';


export default class ReviewDto extends ModelDto {
    
    idComentario  = '';
    usuario   =    new UsuarioDto();
    reseña =    new ReviewDto();
    comentario =  '';
    fecha =  '';

    constructor(idComentario = '', usuario = new UsuarioDto(), reseña = new ReviewDto(), comentario = '', fecha = ''){
        super();
        this.idComentario  =    idComentario   
        this.usuario   =    usuario
        this.reseña =    reseña
        this.comentario =  comentario
        this.fecha =        fecha
    }

    decode(json){ 
        this.idComentario =     json['_idComentario'];
        this.usuario =      usuario.decode(json['_usuario']);
        this.reseña =    contenido.decode(json['_reseña']);
        this.comentario =  json['_comentario'];
        this.fecha =        json['_fecha'];
        return this;

    }

    encode(){
        json = {
            '_idComentario':     this.idComentario,
            '_usuario':      this.usuario.encode(),
            '_reseña':    this.reseña.encode(),
            '_comentario':  this.comentario,
            '_fecha':        this.fecha,
        };

        return JSON.stringify(json);
        
    }

}