import * as reducers from './reducers/index.reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    operario: reducers.OperarioState
}

export const appReducers: ActionReducerMap<AppState> = {
    operario: reducers.operarioReducer
}; 