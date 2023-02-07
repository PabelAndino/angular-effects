import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioFail } from '../actions';

interface IPayloadError {
    url: string
    name: string
    message: string

}

export interface UsuarioState {
    id: string | null
    user: Usuario | null
    loaded: boolean
    loading: boolean
    error: IPayloadError

}

const errorInitState: IPayloadError = {
    url: '',
    name: '',
    message: ''
}

export const initialStateUsuario: UsuarioState = {
    id: null,
    user: null/*  {
        id:0,
        first_name:'',
        last_name:'',
        avatar:''
    } */,
    loaded: false,
    loading: false,
    error: errorInitState
}

const _cargarUsuario = createReducer(initialStateUsuario,

    on(cargarUsuario, (state, { id }) => ({ ...state, loading: true, id: id })),
    on(cargarUsuarioSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        user: {...action.usuario}
    })),
    on(cargarUsuarioFail, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
        }

    })),


);

export function usuarioReducer(state = initialStateUsuario, action: Action) {
    return _cargarUsuario(state, action);
}