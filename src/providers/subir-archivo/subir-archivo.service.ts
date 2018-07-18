import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url.servicios.config';

@Injectable()
export class SubirArchivoService {

  constructor(private http:HttpClient) { }


  subirArchivo( archivo: File, tipo: string, _id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'file', archivo, archivo.name );
      formData.append( '_id', _id );

      xhr.onreadystatechange = () => {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            resolve( JSON.parse( xhr.response ) );
          } else {
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + archivo.name;

      xhr.open('POST', url, true );
      xhr.send( formData );

    });

  }

  fileUpload(fileItem: File, tipo: string, id: string) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData: FormData = new FormData();
    formData.append('file', fileItem, fileItem.name);
    return this.http.put(url, formData, { reportProgress: true });
  }

}
