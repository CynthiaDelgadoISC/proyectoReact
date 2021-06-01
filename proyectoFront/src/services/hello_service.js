import DataService from './data_service';
import ListaComentarioDto from '../models/lista_comentario_model';
import Global from '../configuration/global';

export default class HelloService{

    getHello = () => (new DataService(new ListaComentarioDto())).get('/getComment');

}