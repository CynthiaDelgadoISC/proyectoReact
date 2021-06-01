import {ModelDto} from './data_model.js';
import ReviewDto from './reseña_model';
import UsuarioDto from './usuario_model';
import Serializer from './serializer';

export default class ComentarioDto extends ModelDto {
    
    idComentario = '';
    usuario   =    new UsuarioDto();
    reseña =       new ReviewDto();
    comentario =   '';
    fecha =        '';

    constructor(idComentario = '', usuario = new UsuarioDto(), reseña = new ReviewDto(), comentario = '', fecha = ''){
        super();
        this.idComentario = idComentario   
        this.usuario =      usuario
        this.reseña =       reseña
        this.comentario =   comentario
        this.fecha =        fecha
    }

    static getList    = (lista) => new Serializer(new ComentarioDto()).decodeList(lista);

    static encodeList = (lista) => new Serializer(new ComentarioDto()).encodeList(lista);
    
    decode(json){ 
        this.idComentario = json['_idComentario'];
        this.usuario =      this.usuario.decode(json['_usuario']);
        this.reseña =       this.reseña.decode(json['_reseña']);
        this.comentario =   json['_comentario'];
        this.fecha =        json['_fecha'];

        return this;
    }

    encode(){
        json = {
            '_idComentario': this.idComentario,
            '_usuario':      this.usuario.encode(),
            '_reseña':       this.reseña.encode(),
            '_comentario':   this.comentario,
            '_fecha':        this.fecha,
        };

        return JSON.stringify(json);
        
    }

}