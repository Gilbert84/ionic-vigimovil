import { Component,AfterViewInit } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         LoadingController,
         AlertController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides,List } from 'ionic-angular';

import { OperarioService } from '../../providers/operario/operario.service';
import { DespachoPage } from '../despacho/despacho';

import { Operario } from '../../models/operario.model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides:Slides;
  @ViewChild(List) list:List;

  operario = new Operario();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private operarioService:OperarioService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  verificarOperario(operario){//validamos la clave del operario
    this.operario.alias=operario.alias;
    this.operario.password= operario.password;

    let loading=this.loadingCtrl.create({
      content:"Verificando espere por favor..."
    });

    loading.present();

    this.operarioService.login(operario).subscribe((resp:any) => {
      loading.dismiss();
      if(resp.ok){
       //continuar a la siguiente pantalla segundo slide
        this.slides.lockSwipes(false);//desbloquear slides
        this.slides.freeMode=true;
        this.slides.slideNext();
        this.slides.lockSwipes(true);//bloquear slides
        this.slides.freeMode=false;
        this.operario=resp.operario;
      }else{
        this.alertCtrl.create({
          title: resp.mensaje,
          subTitle:"Por favor verifique su datos, o hable con el administrador",
          buttons:["Ok!"]
        }).present();
      }
    },
    (error)=>{
      loading.dismiss();
      this.alertCtrl.create({
        title: error.name,
        subTitle:error.message,
        message:'Hubo un problema al iniciar session , intente nuevamente o hable con el administrador',
        buttons:["Ok!"]
      }).present();
    });

  }


  ingresar(){//ingresamos al area de trabajo

    this.navCtrl.setRoot(DespachoPage);
    
  }


  ngAfterViewInit(){

    this.slides.lockSwipes(true);//bloquear slides
    this.slides.freeMode=false;//
    this.slides.paginationType="progress";
  }

  mostrarLogin(){

    this.alertCtrl.create({
      title: 'Ingrese el usuario',
      inputs:[
        {
          name: 'alias',
          placeholder: 'Nombre de usuario'
        },
        {
          name:'password',
          placeholder:'codigo',
          type:'password'
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


}
