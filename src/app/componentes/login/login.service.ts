import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase) { }

  logarService(objUsuario: any) {
    return this.db.list('provadevops-bbd39-default-rtdb').valueChanges();
  }

}
