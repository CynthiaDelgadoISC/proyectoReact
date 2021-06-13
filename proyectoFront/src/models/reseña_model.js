import {ModelDto} from './data_model.js';
import ContentDto from './content_model';
import Serializer from './serializer';
import UserDto from './usuario_model';

export default class ReviewDto extends ModelDto {
    
    idReseña  =    '';
    usuario   =    new UserDto();
    contenido =    new ContentDto();
    idUsuario =    '';
    idContenido =  '';
    descripcion =  '';
    fecha =        '';
    calificacion = 0;

    constructor(idReseña ='', usuario = new UserDto(), contenido = new ContentDto(), idUsuario = '', idContenido = '', descripcion = '', fecha = '', calificacion = 0){
        super();
        this.idReseña  =    idReseña    
        this.usuario   =    usuario
        this.contenido =    contenido
        this.idUsuario = idUsuario
        this.idContenido = idContenido
        this.descripcion =  descripcion
        this.fecha =        fecha
        this.calificacion = calificacion
    }

    static getList    = (lista) => new Serializer(new ReviewDto()).decodeList(lista);

    static encodeList = (lista) => new Serializer(new ReviewDto()).encodeList(lista);

    decode(json){ 
        this.idReseña =     json['_id'];
        this.descripcion =  json['_descripcion'];
        this.fecha =        json['_fecha'];
        this.calificacion = json['_calificacion'];
        return this;
    }

    encode(){
        let json = {
            '_id':     this.idReseña,
            '_idUsuario': this.idUsuario,
            '_idContenido': this.idContenido,
            '_descripcion':  this.descripcion,
            '_fecha':        this.fecha,
            '_calificacion': this.calificacion,
        };

        return JSON.stringify(json);
        
    }

}