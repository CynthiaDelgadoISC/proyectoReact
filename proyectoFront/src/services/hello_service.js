import DataService from './data_service';
import HelloWorldDto from '../models/hello_model';
import Global from '../configuration/global';

export default class HelloService{

    getHello = () => (new DataService(new HelloWorldDto())).get('/hello');

}