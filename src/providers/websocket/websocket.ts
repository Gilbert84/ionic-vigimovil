import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';

const URL = 'ws://192.168.1.10:81';

export interface Message {
	author: string,
	message: string
}


@Injectable()
export class WebsocketService {

	public messages: Subject<Message>;
	public registros=[];
	public contador={};

	constructor() {
		this.messages = <Subject<Message>>this.connect(URL)
			.map((response) => {
				let d = new Date();
				let hora=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); 
				let data = JSON.parse(response.data);
				data.hora=hora;
				this.contador=data;
				this.registros.push(data);
				console.log('resgistros: ',this.registros);
        return data;
			});
	}

	

	private fechaHora(){
		let Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		let diasem=new Array('domingo','lunes','martes','miercoles','jueves','viernes','sabado');
		let d = new Date();
		let mes= d.getMonth()+1;
		let fechaCompleta=diasem[d.getDay()]+" "+d.getDate()+" de "+Mes[d.getMonth()]+" de "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		console.log(fechaCompleta);
	}

  private subject: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    } 
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<MessageEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(data));
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}


