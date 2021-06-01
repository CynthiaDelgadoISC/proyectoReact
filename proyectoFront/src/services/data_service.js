import {ModelDto} from '../models/data_model.js'
import Global from '../configuration/global';

export default class DataService{

    model;
    headers;

    constructor(model){
        this.model = model;
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        };
    }

    async post(method, model){
        const response = await fetch(`${Global.serverURL}${method}`, {
            method: 'POST',
            headers: this.headers,
            body: model.encode()
        });
        const body = await response.json();
        if(response.statusCode == 200)
            return model.decode(response.body);
        else
            return null;
    }

    async get(method){
        console.log(`${Global.serverURL}${method}`);
        const response = await (fetch(`${Global.serverURL}${method}`, {
            method: 'GET',
            headers: this.headers,
        }));

        const body = await response.json();
        if(response.status == 200)
            return this.model.decode(body);
        else
            return null;
    }    

}