import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner , QrScannerService } from '../../../providers/plugins-nativos/plugins.service.index'


@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage {

  camaraFrontal:boolean=false;
  estadoCamara='apagada';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform:Platform,
    private toastCtrl: ToastController,
    private barcodeScanner:BarcodeScanner,
    private qrScannerService:QrScannerService
    ){

      //this.qrScannerService.historial[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CounterEventPage');
  }

  cambiarCamara(){
    if(this.camaraFrontal){
      this.camaraFrontal=false;
      this.estadoCamara='camara ON';
    }else{
      this.camaraFrontal=true;
      this.estadoCamara='camara OFF';
    }
    console.log(this.camaraFrontal);
  }

  scan(){

    if(!this.platform.is('cordova')){
      //this.qrScannerService.agregarRegistro('http://google.com');
      this.qrScannerService.agregarRegistro( `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:Gilberto Hernandez
N;CHARSET=UTF-8:Hernandez;Gilberto;;;
UID;CHARSET=UTF-8:69531f4a-c34d-4a1e-8922-bd38a9476a53
TEL;TYPE=CELL:312-429-9062
ROLE;CHARSET=UTF-8:electronico
ORG;CHARSET=UTF-8:BellanitaGroup
REV:2018-05-23T09:38:46-05:00
END:VCARD` );
      return;
    }
    
    this.barcodeScanner.scan({preferFrontCamera:this.camaraFrontal}).then((barcodeData:any)=>{
    console.log('data del scanner: ', barcodeData);
    console.log('result : ', barcodeData.text);
    console.log('format : ', barcodeData.format);
    console.log('cancelled : ', barcodeData.cancelled);

    if( barcodeData.cancelled == 0 && barcodeData.text!=null){
      this.qrScannerService.agregarRegistro( barcodeData.text );
    }

    },(error)=>{
      console.log('error:',error);
      this.mostrarError('error'+error);
    });
  }


  mostrarError( mensaje:string){

    let toast= this.toastCtrl.create({
      message:mensaje,
      duration:1500
    });
    toast.present();
  }




}
