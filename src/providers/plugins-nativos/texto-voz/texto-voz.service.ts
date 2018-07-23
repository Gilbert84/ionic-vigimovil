import { Injectable } from '@angular/core';

//plugins que requieren permiso de uso
import { TextToSpeech } from '../plugins.service.index';


@Injectable()
export class TextoAVozService {

    constructor( public textToSpeech:TextToSpeech){}


    decir(mensaje:string){

        const opciones = {
            text: mensaje,
            locale: 'es-CO',
            //rate: 1.55
        }

        this.textToSpeech.speak(opciones);
    }

 

}