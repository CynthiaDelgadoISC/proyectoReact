import {ModelDto} from './data_model.js';
import Serializer from './serializer';

export default class UserDto extends ModelDto {
    
    idUsuario =  '';
    nombre =     '';
    apellido =   '';
    fecha =      '';
    correo =     '';
    contraseña = '';
    url =        '';

    constructor(idUsuario = '', nombre = '' ,apellido = '' ,fecha = '' ,correo = '' ,contraseña = '' ,url = ''){
        super();
        this.idUsuario  = idUsuario;
        this.nombre     = nombre;
        this.apellido   = apellido;
        this.fecha      = fecha;
        this.correo     = correo;
        this.contraseña = contraseña;
        this.url        = url;
        
    }

    static getList    = (lista) => new Serializer(new UserDto()).decodeList(lista);

    static encodeList = (lista) => new Serializer(new UserDto()).encodeList(lista);

    decode(json){
        this.idUsuario  = json['_id']
        this.nombre     = json['_nombre']
        this.apellido   = json['_apellido']
        this.fecha      = json['_fechaNacimiento']
        this.correo     = json['_correo']
        this.contraseña = json['_contrasena']
        this.url        = json['_url']
        return this;
    }

    encode(){
        let json = {
            '_id'  : this.idUsuario,
            '_nombre'     : this.nombre,
            '_apellido'   : this.apellido,
            '_fechaNacimiento'      : this.fecha,
            '_correo'     : this.correo,
            '_contrasena' : this.contraseña,
            '_url'        : this.url,
        };

        return JSON.stringify(json);
    }

}