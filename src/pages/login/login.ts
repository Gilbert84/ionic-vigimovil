import { Component,AfterViewInit } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         LoadingController,
         AlertController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides,List } from 'ionic-angular';


import { UserService } from '../../providers/user/user.service';
import { TabsPage } from '../../pages/index.pages';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides:Slides;
  @ViewChild(List) list:List;

  key:string="";//llave de acceso
  keygen:string="1234";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService:UserService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  validateKey(){//validamos la clave del usuario

    let loading=this.loadingCtrl.create({
      content:"Espere por favor..."
    });

    loading.present();

                      loading.dismiss();
                        if( this.key==this.keygen){
                          //continuar a la siguiente pantalla
                          this.slides.lockSwipes(false);//desbloquear slides
                          this.slides.slideNext();
                          this.slides.lockSwipes(true);//bloquear slides

                        }else{
                          this.alertCtrl.create({
                            title:"La clave no es correcta",
                            subTitle:"Por favor verifique su clave, o hable con el administrador",
                            buttons:["Ok!"]
                          }).present();
                        }

    // this.userService.validateUser(this.key)
    //                 .then(valid=>{
    //                   console.log('valid:');
    //                   console.log(valid);
    //                   loading.dismiss();
    //                     if(valid && this.key==this.keygen){
    //                       //continuar a la siguiente pantalla
    //                       this.slides.lockSwipes(false);//desbloquear slides
    //                       this.slides.slideNext();
    //                       this.slides.lockSwipes(true);//bloquear slides

    //                     }else{
    //                       this.alertCtrl.create({
    //                         title:"La clave no es correcta",
    //                         subTitle:"Por favor verifique su clave, o hable con el administrador",
    //                         buttons:["Ok!"]
    //                       }).present();
    //                     }
    //                 }).catch(err=>{
    //                    loading.dismiss();
    //                    console.log('Error validando login: '+ JSON.stringify(err));
    //                 });

  }


  login(){//ingresamos al segundo slide
    console.log('root tabpage');
    this.navCtrl.setRoot(TabsPage);

  }

  ngAfterViewInit(){

    this.slides.lockSwipes(true);//bloquear slides
    this.slides.freeMode=false;//
    this.slides.paginationType="progress";
  }


}
