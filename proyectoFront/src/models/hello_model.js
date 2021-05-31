import {ModelDto} from './data_model.js';

export default class HelloWorldDto extends ModelDto {
    
    hello = '';
    world = '';

    constructor(hello='', world=''){
        super();
        this.hello = hello;
        this.world = world;
    }

    decode(json){
        this.hello = json['_hello'];
        this.world = json['_world'];

        return this;
    }

    encode(){
        json = {
            '_hello': this.hello,
            '_world': this.world,
        };

        return JSON.stringify(json);
    }

}