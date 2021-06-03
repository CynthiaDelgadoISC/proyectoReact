import ReseñaDto from './reseña_model';
import {ModelDto} from './data_model.js';

export default class ListaReseñaDto extends ModelDto {

    reseñas = [];

    constructor(reseñas = [new ReseñaDto()]){
        super();
        this.reseñas = reseñas;
    }

    decode(json){
        if(json == null) return;
        this.reseñas = ReseñaDto.getList(json['_reseñas']);
        
        return this;
    }

    encode(){
        json = {
            '_reseñas': ReseñaDto.encodeList(this.comentarios),
        }
    }

}