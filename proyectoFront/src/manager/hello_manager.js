import HelloService from '../services/hello_service'

export class HelloManager{

    async getHelloWorld(){
        const dto = await (new HelloService()).getHello();
        
        console.log('aaaa');
         if(dto != null){
            console.log(dto.reseñas[0]);
            console.log(dto.reseñas[1]);
        }
    }

}