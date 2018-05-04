//import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
//import { Platform } from 'ionic-angular';
// import * as CryptoJS from 'crypto-js';


// @Injectable()
// export class CryptoService {

//     key:any = CryptoJS.enc.Utf8.parse('7061737323313233');
//     iv:any = CryptoJS.enc.Utf8.parse('7061737323313233');
//     encrypted:any = CryptoJS.AES.encrypt(
//         CryptoJS.enc.Utf8.parse("It works"), 
//         this.key,
//         {
//             keySize: 128 / 8,
//             iv: this.iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }
//     );

//     decrypted:any = CryptoJS.AES.decrypt(
//         this.encrypted, 
//         this.key, 
//         {
//             keySize: 128 / 8,
//             iv: this.iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }
//     );

//     ver(){
//         console.log('Encrypted :' + this.encrypted);
//         console.log('Key :' + this.encrypted.key);
//         console.log('Salt :' + this.encrypted.salt);
//         console.log('iv :' + this.encrypted.iv);
//         console.log('Decrypted : ' + this.decrypted);
//         console.log('utf8 = ' + this.decrypted.toString(CryptoJS.enc.Utf8));
//     }
     

  
// }

