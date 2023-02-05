import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuario:Usuario[] = []
  
  constructor(private usuarioService:UsuarioService){}
  ngOnInit(): void {
    this.usuarioService.getUser()
    .subscribe(users=>{
      this.usuario = users

      })

    
  }

  
}
