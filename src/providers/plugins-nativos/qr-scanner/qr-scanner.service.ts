import { Injectable } from '@angular/core';

import { ScanData } from '../../../models/scan-data.model';



@Injectable()
export class QrScannerService {

    //arreglo de objetos de tipo scan data
    historial:ScanData[]=[];

    constructor(){}

    agregarRegistro(texto:string){
        let data = new ScanData(texto);
        this.historial.unshift(data);
        console.log('historial',this.historial);
        this.abrirScan(0);
    }

    cargarHistorial(){
        return this.historial;
    }

    abrirScan(index:number){
        let scanData=this.historial[index];

        switch(scanData.tipo){
            case 'http':

                break;
            case 'mapa':
                
                break;
            case 'passvcard':
                this.leerPassVcard(scanData.info);            
                break;
            default:
                console.log('tipo no soportado');
                break;
        }
    }

    leerPassVcard( data:string){
        let campos:any= this.parse_vcard(data);
        console.log(campos);
    }


    private parse_vcard( input:string ) {

        var Re1 = /^(version|fn|title|org):(.+)$/i;
        var Re2 = /^([^:;]+);([^:]+):(.+)$/;
        var ReKey = /item\d{1,2}\./;
        var fields = {};
    
        input.split(/\r\n|\r|\n/).forEach(function (line) {
            var results, key;
    
            if (Re1.test(line)) {
                results = line.match(Re1);
                key = results[1].toLowerCase();
                fields[key] = results[2];
            } else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();
    
                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                    var match = p.match(/([a-z]+)=(.*)/i);
                    if (match) {
                        return [match[1], match[2]];
                    } else {
                        return ["TYPE" + (i === 0 ? "" : i), p];
                    }
                })
                    .forEach(function (p) {
                    meta[p[0]] = p[1];
                });
    
                if (!fields[key]) fields[key] = [];
    
                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                })
            }
        });
    
        return fields;
    };



}