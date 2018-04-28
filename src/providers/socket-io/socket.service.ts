import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {


//todo lo que haya en el constructor hay que proveerlo en app-modules e importarlo
  constructor(
               private storage:Storage,
               private platform: Platform,
               private socket:Socket
             ){}

             
}
