import { Action } from '@ngrx/store'
import { Operario } from '../../models/operario.model';
// definimos cada una de las acciones

export const CARGAR_OPERARIO = '[Usuario] cargar usuario';
export const CARGAR_OPERARIO_FALLO = '[Usuario] cargar usuario fallo';
export const CARGAR_OPERARIO_BIEN = '[Usuario] cargar usuario bien';

export class CargarUsuario implements Action {
    readonly type = CARGAR_OPERARIO;
}

export class CargarUsuarioFallo implements Action {
    readonly type = CARGAR_OPERARIO_FALLO;

    constructor (public cargaError:any ) {

    }
}

export class CargarUsuarioBien implements Action {
    readonly type = CARGAR_OPERARIO_BIEN;

    constructor (public operario:Operario ) {

    }
}

export type OperarioAcciones = CargarUsuario | CargarUsuarioFallo | CargarUsuarioBien;