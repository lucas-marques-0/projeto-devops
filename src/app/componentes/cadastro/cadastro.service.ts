import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private db: AngularFireDatabase) { }

  cadastrarService(objUsuario: any){
    return this.db.list('armazena-pessoas-default-rtdb').push(objUsuario);
  }
}
