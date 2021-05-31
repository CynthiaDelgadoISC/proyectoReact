import HelloWorldDto from '../models/hello_model';
import HelloService from '../services/hello_service'

export class HelloManager{

    async getHelloWorld(){
        const dto = await (new HelloService()).getHello();
        
        if(dto != null)
            console.log(dto.hello,dto.world);
    }

}