import HelloService from '../services/hello_service'
import UserDto from '../models/usuario_model';
import Global from '../configuration/global';
export class HelloManager{

    async getHelloWorld(){
        const dto = await (new HelloService()).getHello();
        
        console.log('aaaa');
         if(dto != null){
            console.log(dto.reseñas[0]);
            console.log(dto.reseñas[1]);
        }
    }

    async register(dto){
        let newDto = await (new HelloService()).subscribe(dto);
        return newDto;
    }

    async saveContent(dto){
        let newDto = await (new HelloService()).saveContent(dto);
        return newDto;
    }

    async saveReview(dto){
        console.log("holaaaaaa");
        let newDto = await (new HelloService()).saveReview(dto);
        return newDto;
    }

    async editUser(dto){
        let newDto = await (new HelloService()).editUser(dto);
        return newDto;
    }
}