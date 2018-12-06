import { Component,AfterViewInit } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         LoadingController,
         AlertController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides,List } from 'ionic-angular';

import { DespachoPage } from '../despacho/despacho';

import { Operario } from '../../models/operario.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { OperarioService } from '../../providers/operario/operario.service';
import { VehiculoService } from '../../providers/vehiculo/vehiculo.service';
import { ViajeService } from '../../providers/viaje/viaje.service';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides:Slides;
  @ViewChild(List) list:List;

  operario = new Operario();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    public socketIoService:SocketIoService,
    public vehiculoService:VehiculoService,
    private operarioService:OperarioService,
    public viajeService:ViajeService      
    ) {

  }


  ngAfterViewInit(){

    this.slides.lockSwipes(true);//bloquear slides
    this.slides.freeMode=false;//
    this.slides.paginationType="progress";
    this.obtenerVehiculoStorage();
  }

  verificarOperario(operario){//validamos la clave del operario
    this.operario.alias=operario.alias;
    this.operario.clave= operario.clave.toString();
    let loading=this.loadingCtrl.create({
      content:"Verificando espere por favor..."
    });

    loading.present();

    this.operarioService.conectar(operario).then((operario:Operario)=>{
      loading.dismiss();

      if(operario.identificacion === this.viajeService.asignacion.operario.identificacion){
        //continuar a la siguiente pantalla segundo slide
        this.slides.lockSwipes(false);//desbloquear slides
        this.slides.freeMode=true;
        this.slides.slideNext();
        this.slides.lockSwipes(true);//bloquear slides
        this.slides.freeMode=false;
        this.operario = operario;
      }else{
        this.alertCtrl.create({
          title: 'Lea con atencion!',
          subTitle:"Sus credenciales son correctas pero no pertenecen a este vehiculo , por favor vaya al vehiculo que le corresponde",
          buttons:["Ok!"]
        }).present();
      }

    }).catch((error)=>{
      loading.dismiss();
      this.alertCtrl.create({
        title: error.mensaje,
        subTitle:"Por favor verifique su datos, o hable con el administrador",
        buttons:["Ok!"]
      }).present();
    });

  }


  continuar(){//ingresamos al area de trabajo
    if(this.viajeService.asignacion){
      this.navCtrl.setRoot(DespachoPage);
    }
    
  }

  obtenerAsignacion(vehiculo:Vehiculo){
    this.viajeService.obtenerAsignacionStorage().then((asignacion)=>{
      if(!asignacion){
        this.viajeService.obtenerAsignacionPorVehiculo(vehiculo).then();
      }
    });
  }

  obtenerVehiculo(){
    this.vehiculoService.obtenerVehiculoPorDispositivo().then((vehiculo:Vehiculo)=>{
      this.obtenerAsignacion(vehiculo);
      return this.operarioService.cargarStorage();
    }).then((operario:Operario) => {
      if(operario){
        this.operario = operario;
        this.navCtrl.setRoot(DespachoPage);
      }
    });
  }

  login(){
    this.alertCtrl.create({
      title: 'Ingrese sus credenciales',
      inputs:[
        {
          name: 'identificacion',
          placeholder: 'identificacion',
          type:'number'
        },
        {
          name:'clave',
          placeholder:'clave',
          type:'number'
        }
      ],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Ingresar',
          handler: operario=>{
            this.verificarOperario(operario);
          }
        }
      ]
    }).present();

  }

  obtenerVehiculoStorage(){
    this.vehiculoService.cargarStorage().then((vehiculo:Vehiculo) =>{
      if(vehiculo){  
        this.obtenerAsignacion(vehiculo);
      }else{
        this.obtenerVehiculo();
      }
    });
  }


}
