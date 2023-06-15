import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

// import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase) { }

  logarService(objUsuario: any): any {
    console.log(objUsuario)
    return new Promise((resolve, reject) => {
      this.db.list('armazena-pessoas-default-rtdb').valueChanges().subscribe(
        (data: any[]) => {
          console.log(data)
          const usuario = data.find(user => user.username === objUsuario.username && user.senha === objUsuario.senha);
          if (usuario) {
            resolve(true); 
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
