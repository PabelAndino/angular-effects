import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = 'https://reqres.in/api'
  constructor(private http: HttpClient) { }
  getUser() {
    return this.http.get(`${this.url}/users?per_page=7`)//con el pipe se seleccione que items especificos quiero de la respuesta
            .pipe(map((res:any)=>res['data']))
  }
}
