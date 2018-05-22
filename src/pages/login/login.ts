import { Component,AfterViewInit } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         LoadingController,
         AlertController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides,List } from 'ionic-angular';

import { Operario } from '../../interfaces/operario.interface'
import { OperarioService } from '../../providers/operario/operario.service';
import { TabsPage } from '../../pages/index.pages';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides:Slides;
  @ViewChild(List) list:List;

  operario:Operario={
    alias:'',
    password:''
  };

  key:string="";//llave de acceso
  keygen:string="1234";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private operarioService:OperarioService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  verificarOperario(operario:Operario){//validamos la clave del operario

    this.operario=operario;

    let loading=this.loadingCtrl.create({
      content:"Verificando espere por favor..."
    });

    loading.present();

    this.operarioService.login(operario).then((resp:any)=>{

      console.log(resp);

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
    });

  }


  ingresar(){//ingresamos al area de trabajo

    this.navCtrl.setRoot(TabsPage);
    
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
          placeholder:'codigo'
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
