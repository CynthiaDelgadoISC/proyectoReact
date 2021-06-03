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
        this.idComentario = json['_id'];
        this.usuario =      Object.create(this.usuario).decode(json['_usuario']);
        this.reseña =       Object.create(this.reseña).decode(json['_reseña']);
        this.comentario =   json['_comentario'];
        this.fecha =        json['_fecha'];

        return this;
    }

    encode(){
        json = {
            '_id': this.idComentario,
            '_usuario':      Object.create(this.usuario).encode(),
            '_reseña':       Object.create(this.reseña).encode(),
            '_comentario':   this.comentario,
            '_fecha':        this.fecha,
        };

        return JSON.stringify(json);
        
    }

}