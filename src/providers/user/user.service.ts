import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
//import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  key:string=null;

//todo lo que haya en el constructor hay que proveerlo en app-modules
  constructor(
               //private storage:Storage,
               //private platform: Platform
             ){console.log('servicio usuarios listo');}


}
