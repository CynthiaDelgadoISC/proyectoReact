import ComentarioDto from './comentario_model';
import {ModelDto} from './data_model.js';

export default class ListaComentarioDto extends ModelDto {

    comentarios = [];

    constructor(comentarios = [new ComentarioDto()]){
        super();
        this.comentarios = comentarios;
    }

    decode(json){
        if(json == null) return;
        this.comentarios = ComentarioDto.getList(json['_comentarios']);
        
        return this;
    }

    encode(){
        json = {
            '_comentarios': ComentarioDto.encodeList(this.comentarios),
        }
    }

}