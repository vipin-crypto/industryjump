import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


export class ChatService {
    public url = 'http://13.232.208.65:3000';
    public socket;

    constructor() {
        this.socket = io(this.url);
        // this.createConnection();
    }

    public sendMessage(data) {
        console.log("socket is working",data);

        this.socket.emit('sendMessage', data);
    }
   
    public createConnection(id) {
        this.socket.on('connect', socketIo=>{
            console.log(socketIo);
            this.socket.emit('joinRoom', id);
            this.recieveMessages();
        });
        // console.log("jion",id)
        //   this.socket.emit('joinRoom', id)
        //     return Observable.create((observer) => {
        //         this.socket.on('getMessage', (message) => {
        //             observer.next(message);
        //         })
        //     });
        
    }
    public recieveMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('getMessage', (message) => {
                observer.next(message);
            });
        });
    }
    public sentMessageConfirm = (id) => {
        return Observable.create((observer) => {
            this.socket.on(id, (message) => {
                observer.next(message);
            });
        });
    }

    public getMessages = (id) => {
        return Observable.create((observer) => {

            this.socket.on(id, (message) => {
                observer.next(message);
            });
        });
    }

    public removeListener(name){
        this.socket.removeListener(name);
    }
}