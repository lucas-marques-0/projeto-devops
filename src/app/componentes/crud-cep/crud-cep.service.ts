import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudCepService {
  
  constructor(private http: HttpClient, private db: AngularFireDatabase) { }
  

  carregarEndereco(cep: string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  carregarCamposEndereco(uf: any){
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
    return this.http.get(url).toPromise();
  }

  carregarCampoEstado(){
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getChaveUsuario(username: string): Observable<any> {
    return this.db.list('armazena-pessoas-default-rtdb', ref =>
      ref.orderByChild('username').equalTo(username)
    ).snapshotChanges().pipe(
      map(data => {
        const user = data[0];
        if (user) {
          return user.key;
        } else {
          throw new Error('Usuário não encontrado');
        }
      })
    );
  }
  
  getDadosPessoa(chaveUsuario: string){
    return this.db.list(`armazena-pessoas-default-rtdb/${chaveUsuario}/enderecos`).valueChanges();
  }

  async atualizarPessoas(chaveUsuario: string, novaListaEnderecos: any): Promise<void> {
    return this.db.object(`armazena-pessoas-default-rtdb/${chaveUsuario}`).update({ enderecos: novaListaEnderecos });
  }
}

  

