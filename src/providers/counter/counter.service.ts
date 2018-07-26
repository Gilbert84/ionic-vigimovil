import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket.service'
import { AUDIOS_CONTEO } from '../../data/data.audiosConteo';
import { AudioConteo } from '../../interfaces/audioConteo.interface';
import { ConfigService } from '../config/config.service';


enum Codigo {
	limpiar=1,
	reiniciar=2
}




export interface Comando {
	tipo:number,
	codigo: Codigo.limpiar,
	mensaje: string
}




@Injectable()
export class CounterService {

	public contador: Subject<Comando>;
	public registros=[];
	public registroActual={};
	public audiosConteo:AudioConteo[]=[];
	audio = new Audio();
	audioTiempo:any;

	constructor(private wsService:WebsocketService,
				private configService:ConfigService) {

					this.audiosConteo=AUDIOS_CONTEO.slice(0);//clonamos la data
					this.contador = <Subject<Comando>>this.wsService
						.connect(this.configService.configuracion.contadorIp)
						.map((response: MessageEvent): Comando => {
							let data = JSON.parse(response.data);
							 let d = new Date();
							 let hora=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); 
							data.hora=hora;
							 this.registroActual=data;
							 this.registros.push(data);
							 this.reproducirAudio(this.audiosConteo[0]);			
							return data;
					});

	}

	iniciarContador(){

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
		console.log('nuevo mensaje de la tablet al dispositivo: ', cmd);
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