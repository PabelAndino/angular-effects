import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosFail } from '../actions';

interface IPayloadError {
    url:string
    name:string
    message:string

}

export interface UsuariosState {
    users: Usuario[]
    loaded: boolean
    loading: boolean
    error: IPayloadError

}

const errorInitState:IPayloadError = {
    url:'',
    name:'',
    message:''
}

export const initialStateUsuarios: UsuariosState = {
    users:[],
    loaded: false,
    loading: false,
    error: errorInitState
}

const _cargarUsuarios = createReducer(initialStateUsuarios,

    on(cargarUsuarios, state => ({ ...state, loading: true })),
    on(cargarUsuariosSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...action.usuarios]
    })),
    on(cargarUsuariosFail, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url:payload.url,
            name:payload.name,
            message:payload.message,
        }

    })),

);

export function usuariosReducer(state = initialStateUsuarios, action:Action) {
    return _cargarUsuarios(state, action);
}