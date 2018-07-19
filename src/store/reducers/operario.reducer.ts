
import * as OperarioActions from '../actions/operario.actions';
import { Operario } from '../../models/operario.model';


export interface OperarioState {
    operario: Operario;
    cargado: boolean;
    cargando:boolean;
    error:any;
}

const estadoInicial: OperarioState = {
    operario: new Operario(),
    cargado: false,
    cargando: false,
    error: null
};

export function operarioReducer( state = estadoInicial, action:OperarioActions.OperarioAcciones): OperarioState {

    switch(action.type) {

        case OperarioActions.CARGAR_OPERARIO:
            return {
                ...state,
                cargando:true
            }

        case OperarioActions.CARGAR_OPERARIO_BIEN:
            return {
                ...state,
                cargando: false,
                cargado: true,
                operario: {...action.operario}
            }

        case OperarioActions.CARGAR_OPERARIO_FALLO:
            return {
                ...state,
                cargando: false,
                cargado:false,
                error:action.cargaError
            }

        default:
            return state;

    }
}