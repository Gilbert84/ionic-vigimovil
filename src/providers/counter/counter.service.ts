import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket.service'
import { AUDIOS_CONTEO } from '../../data/data.audiosConteo';
import { AudioConteo } from '../../interfaces/audioConteo.interface';
import { ConfigService } from '../config/config.service';
import { RegistroContador , EventoContador ,Codigo } from '../../models/registro-contador.model';



@Injectable()
export class CounterService {

	public contador: Subject<RegistroContador> = new Subject();
	public registros:RegistroContador[]=[];
	public registroActual:RegistroContador= new RegistroContador();
	public audiosConteo:AudioConteo[]=[];
	audio = new Audio();
	audioTiempo:any;

	constructor(
		private wsService:WebsocketService,
		private configService:ConfigService) {

		this.audiosConteo=AUDIOS_CONTEO.slice(0);//clonamos la data
	}

	conectarContador(){
		console.log(this.configService.configuracion.contadorIp);
		
		return this.contador = <Subject<RegistroContador>>this.wsService
			.connect(this.configService.configuracion.contadorIp)
			.map((response: MessageEvent)=> {
				let registro:RegistroContador = JSON.parse(response.data);
				console.log(registro);
				this.registroActual= new RegistroContador({...registro,hora:new Date()});
				//this.registroActual= registro;
				//this.registros.push(data);
				this.reproducirAudio(this.audiosConteo[0]);
				this.enviarComando(new EventoContador({tipo:1,codigo:Codigo.recibido,mensaje:'ok'}));			
				return this.registroActual;
		});
	}


	reproducirAudio(audioConteo:AudioConteo){

		if (!audioConteo.reproducir)return;
		this.audio.src=audioConteo.sonido;
		this.audio.load();
		this.audio.pause();
		this.audio.play();
		//audioConteo.reproducir = true;
		this.audioTiempo = setTimeout(()=>{ 
			audioConteo.duracion * 1000
		}); 

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


	enviarComando(cmd){
		//console.log('nuevo mensaje de la tablet al dispositivo: ', cmd);
		this.contador.next(cmd);
	}
	// private fechaHora(){
	// 	let Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	// 	let diasem=new Array('domingo','lunes','martes','miercoles','jueves','viernes','sabado');
	// 	let d = new Date();
	// 	let mes= d.getMonth()+1;
	// 	let fechaCompleta=diasem[d.getDay()]+" "+d.getDate()+" de "+Mes[d.getMonth()]+" de "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	// 	console.log(fechaCompleta);
	// }


}