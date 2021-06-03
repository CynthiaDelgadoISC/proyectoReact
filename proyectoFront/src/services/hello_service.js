import DataService from './data_service';
import ListaComentarioDto from '../models/lista_comentario_model';
import Global from '../configuration/global';
import ListaReseñaDto from '../models/lista_reseña_model';

export default class HelloService{

    getHello = () => (new DataService(new ListaReseñaDto())).get('/getComment');

}