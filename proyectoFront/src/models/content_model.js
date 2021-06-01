import {ModelDto} from './data_model.js';

export default class ContentDto extends ModelDto {
    
    titulo =      '';
    url =         '';
    categoria =   '';
    idContenido = '';

    constructor(titulo ='', url ='', categoria = '', idContenido =''){
        super();
        this.titulo =      titulo;
        this.url =         url;
        this.categoria =   categoria;
        this.idContenido = idContenido;
    }

    static getList    = (lista) => new Serializer(new ContentDto()).decodeList(lista);

    static encodeList = (lista) => new Serializer(new ContentDto()).encodeList(lista);

    decode(json){ 
        this.titulo =      json['_titulo'];
        this.url =         json['url'];
        this.categoria =   json['_categoria'];
        this.idContenido = json['_idContenido'];
        return this;
    }

    encode(){
        json = {
            '_titulo':      this.titulo,
            '_url':         this.url,
            '_categoria':   this.categoria,  
            '_idContenido': this.idContenido,
        };

        return JSON.stringify(json);
    }

}