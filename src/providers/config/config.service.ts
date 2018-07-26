import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../../global/global.service';
import { Configuracion } from '../../interfaces/configuracion.interface';



@Injectable()
export class ConfigService {

	public configuracion:Configuracion = {
    autoInicio:false,
    areaMetropool:false,
    serverIp:'http://localhost:3000',
    contadorIp:'ws://192.168.1.10:81',
    apykey:''
	};
	
	public existe:boolean=false;

	constructor(public globalService:GlobalService,
	    		public http: HttpClient,
    			public storage: Storage,) {

	}
	cargarConfiguracion() {

		return new Promise ((resolve,reject)=>{
	
		  if(this.globalService.android){
			//dispositivo
			this.storage.get('configuracion').then((configuracion)=>{
			  if(configuracion){
				this.configuracion = configuracion;
				this.existe= true;
				resolve(true);//existe 
			  }else{
				this.existe= false;
				resolve(false);//no existe
			  }
			});
	
		  }else{
			//escritorio
			if ( localStorage.getItem('configuracion')) {
			  this.configuracion = JSON.parse( localStorage.getItem('configuracion') );
			  this.existe= true;
			  resolve(true);//si existe 
		
			} else {
			  this.existe= false;
			  resolve(false);//no existe 
			}
		  }
	
		});
	  }	

	guardarConfiguracion( configuracion ) {
		return new Promise(resolve =>{
		  if(this.globalService.android){
			//dispositivo
			this.storage.set('configuracion',JSON.stringify(configuracion)).then(() =>{
			  this.configuracion = configuracion;
			  this.existe= true;
			  resolve(true);
			});
	  
		  }else{
			//escritorio
			localStorage.setItem('configuracion', JSON.stringify(configuracion) );
			this.configuracion = configuracion;
			this.existe= true;
			resolve(true);
		  }
		});
	
	  }

	  consultarUrl(url){
		return this.http.get( url )
					.map( (resp: any) => {
						return resp;
					});
	  }
    
    
}