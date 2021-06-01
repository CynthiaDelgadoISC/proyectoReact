import {ModelDto} from './data_model.js';
import ContentDto from './content_model';
import UsuarioDto from './usuario_model';


export default class ReviewDto extends ModelDto {
    
    idReseña  =    '';
    usuario   =    new UsuarioDto();
    contenido =    new ContentDto();
    descripcion =  '';
    fecha =        '';
    calificacion = 0;

    constructor(idReseña = '', usuario = new UsuarioDto(), contenido = new ContentDto(), descripcion = '', fecha = '', calificacion = 0){
        super();
        this.idReseña  =    idReseña    
        this.usuario   =    usuario
        this.contenido =    contenido
        this.descripcion =  descripcion
        this.fecha =        fecha
        this.calificacion = calificacion
    }

    static getList    = (lista) => new Serializer(new ReviewDto()).decodeList(lista);

    static encodeList = (lista) => new Serializer(new ReviewDto()).encodeList(lista);

    decode(json){ 
        this.idReseña =     json['_idReseña'];
        this.usuario =      this.usuario.decode(json['_usuario']);
        this.contenido =    this.contenido.decode(json['_contenido']);
        this.descripcion =  json['_descripcion'];
        this.fecha =        json['_fecha'];
        this.calificacion = json['_calificacion'];
        return this;

    }

    encode(){
        json = {
            '_idReseña':     this.idReseña,
            '_usuario':      this.usuario.encode(),
            '_contenido':    this.contenido.encode(),
            '_descripcion':  this.descripcion,
            '_fecha':        this.fecha,
            '_calificacion': this.calificacion,
        };

        return JSON.stringify(json);
        
    }

}