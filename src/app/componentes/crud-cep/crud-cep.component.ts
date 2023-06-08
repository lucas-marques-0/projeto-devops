import { Component } from '@angular/core';
import { CrudCepService } from './crud-cep.service';

@Component({
  selector: 'app-crud-cep',
  templateUrl: './crud-cep.component.html',
  styleUrls: ['./crud-cep.component.css']
})
export class CrudCepComponent {
  cep: string = '';
  enderecos: Endereco[] = [];

  constructor(private crudService: CrudCepService) { }

  adicionarEndereco() {
    this.crudService.adicionarEndereco(this.cep).subscribe((data: any) => {
      this.enderecos.push(data);
      this.cep = '';
    }, erro => {
      console.log(erro);
    });
  }

  deleteAddress(address: Endereco) {
    const index = this.enderecos.indexOf(address);
    if (index !== -1) {
      this.enderecos.splice(index, 1);
    }
  }
}

interface Endereco {
  cep: string;
  logradouro: string;
  localidade: string;
  bairro: string;
}
