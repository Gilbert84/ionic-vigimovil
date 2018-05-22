import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import { AUDIOS_CONTEO } from '../../data/data.audiosConteo';
import { AudioConteo } from '../../interfaces/audioConteo.interface';

const URL = 'ws://192.168.43.10:81';

export interface Message {
	author: string,
	message: string
}


@Injectable()
export class WebsocketService {

	public messages: Subject<Message>;
	public registros=[];
	public contador={};
	public audiosConteo:AudioConteo[]=[];
	audio = new Audio();
	audioTiempo:any;

	constructor() {
		this.audiosConteo=AUDIOS_CONTEO.slice(0);//clonamos la data
		this.messages = <Subject<Message>>this.connect(URL)
			.map((response) => {
				let d = new Date();
				let hora=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); 
				let data = JSON.parse(response.data);
				data.hora=hora;
				this.contador=data;
				this.registros.push(data);
				this.reproducirAudio(this.audiosConteo[0]);			
				console.log('resgistros: ',this.registros);
        		return data;
			});
	}

	reproducirAudio(audioConteo:AudioConteo){

		if (!audioConteo.reproducir)return;
		this.audio.src=audioConteo.sonido;
		this.audio.load();
		this.audio.pause();
		this.audio.play();
		//audioConteo.reproducir = true;
		this.audioTiempo = setTimeout(()=>{ console.log('nuevo evento') , audioConteo.duracion * 1000}); 

  }

  pausarAudio(audioConteoSel:AudioConteo){
		clearTimeout(this.audioTiempo);
		this.audio.pause();
		this.audio.currentTime=0;

		for (let audioConteo of this.audiosConteo){
			if(audioConteo.nombre != audioConteoSel.nombre){
				audioConteo.reproducir=false; // pongo todos los audios de reproduciendo en falso
			}

		}

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


