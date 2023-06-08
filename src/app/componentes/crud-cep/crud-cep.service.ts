import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudCepService {
  constructor(private http: HttpClient) { }

  adicionarEndereco(cep: string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  
}
