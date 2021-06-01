import ModelDto from './data_model';

export default class Serializer{

    modelSeed;

    constructor(modelSeed){
        this.modelSeed = modelSeed;
    }

    decodeList(lista){

        let models = [];

        if(lista == null)
            return models;
        
        for(var json in lista){
            models.push(this.modelSeed.decode(lista[json]));
        }

        return models;
    }

    encodeList(lista){
        let models = [];
        if(lista != null){
            for(var json in lista){
                models.push(json.encode());
            }   
        }

        return models;
    }


}