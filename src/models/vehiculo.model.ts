
interface DatosVehiculo {
    placa:string;
    interno:string;
}

export class Vehiculo {
    
    public placa:string;
    public interno:string;    
    
    constructor (datosVehiculo?: DatosVehiculo) {
        this.placa = datosVehiculo && datosVehiculo.placa || '';
        this.interno = datosVehiculo && datosVehiculo.interno || '';
    }
}