import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,//el signo de dolar significa que es un observable
        private usuarioService: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),//cual es la accion que me interesa escuchar
            //tap(data => console.log(data)),//que informacion fluye despues del oftype
            mergeMap(
                () => this.usuarioService.getUser()
                    .pipe(
                        //tap(data=>console.log(data,'from service'))//para que hay jasta aqui
                        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
                        catchError(error=>of(usuariosActions.cargarUsuariosFail({payload:error})))
                    )
            )//nos ayudara a disparar un nuevo objervable
        )
    )
}