import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private db: AngularFireDatabase) { }

  cadastrarService(objUsuario: any){
    return this.db.list('provadevops-bbd39-default-rtdb').push(objUsuario);
  }
}
