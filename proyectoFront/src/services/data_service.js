import {ModelDto} from './data_model.js'

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
        const response = (await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: model.encode()
        })).json();
        console.log(response);
        if(response.statusCode == 200)
            return model.decode(response.body);
        else
            return null;
    }

    async get(method){
        const response = (await fetch(url, {
            method: 'GET',
            headers: this.headers,
        })).json();

        if(response.status == 200)
            return model.decode(response.body);
        else
            return null;
    }    

}