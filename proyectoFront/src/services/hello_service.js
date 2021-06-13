import DataService from './data_service';
import ListaComentarioDto from '../models/lista_comentario_model';
import UserDto from '../models/usuario_model';
import Global from '../configuration/global';
import ListaReseñaDto from '../models/lista_reseña_model';
import ContentDto from '../models/content_model';
import ReviewDto from '../models/reseña_model';

export default class HelloService{

    getHello = () => (new DataService(new ListaReseñaDto())).get('/getComment');

    subscribe = (dto) => (new DataService(new UserDto())).post('/api/users',dto);

    saveContent = (dto) => (new DataService(new ContentDto())).post('/api/contenidos',dto);

    saveReview = (dto) => (new DataService(new ReviewDto())).post('/api/resenas',dto);

    editUser = (dto) => (new DataService(new ReviewDto())).put('/api/users/ById',dto);
    
}