import DataService from './data_service';
import ListaComentarioDto from '../models/lista_comentario_model';
import UserDto from '../models/usuario_model';
import Global from '../configuration/global';
import ListaReseñaDto from '../models/lista_reseña_model';

export default class HelloService{

    getHello = () => (new DataService(new ListaReseñaDto())).get('/getComment');

    subscribe = (dto) => (new DataService(new UserDto())).post('/api/users',dto);

}