//plugins nativos
export { AndroidPermissions } from '@ionic-native/android-permissions';
export { Uid } from '@ionic-native/uid';
export { BatteryStatus } from '@ionic-native/battery-status';
export { Geolocation } from '@ionic-native/geolocation';
export { BarcodeScanner } from '@ionic-native/barcode-scanner';
export { AndroidFullScreen } from '@ionic-native/android-full-screen';
export { StatusBar } from '@ionic-native/status-bar';
export { TextToSpeech } from '@ionic-native/text-to-speech';




//servicios creados para usar
export { PermissionService } from './permission/permission.service';
export { UbicacionService } from './ubicacion/ubicacion.service';
export { QrScannerService } from './qr-scanner/qr-scanner.service';
export { TextoAVozService } from './texto-voz/texto-voz.service'