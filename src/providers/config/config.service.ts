import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FuncionService } from '../funcion/funcion.service';
import { Configuracion } from '../../models/configuracion.model';




@Injectable()
export class ConfigService {

	public configuracion:Configuracion = new Configuracion(); 
	public existe:boolean=false;

	constructor(public funcionService:FuncionService,
	    		public http: HttpClient,
    			public storage: Storage,) {

	}


	cargarConfiguracion() {

		return new Promise ((resolve,reject)=>{
	
		  if(this.funcionService.android){
			//dispositivo
			this.storage.get('configuracion').then((configuracion)=>{
			  if(configuracion){
				this.configuracion = JSON.parse( configuracion );
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
		  if(this.funcionService.android){
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