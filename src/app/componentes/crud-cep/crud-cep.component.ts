import { Component, OnInit } from '@angular/core';
import { CrudCepService } from './crud-cep.service';

@Component({
  selector: 'app-crud-cep',
  templateUrl: './crud-cep.component.html',
  styleUrls: ['./crud-cep.component.css']
})
export class CrudCepComponent implements OnInit {
  cep: string = '';
  nome: string = '';
  dataNascimento: string = '';
  cidade: string = ''
  bairro: string = ''
  rua: string = '';
  estado: string = '';
  listaCidades: any;
  listaEstados: any;
  listaPessoas: any[] = [];
  colocouCep: boolean = false;
  pessoaEditar: any;
  modoEdicao: boolean = false;
  novaPessoa!: Pessoa;
  indexPessoaNova: any;
  chaveUsuario: any;
  pessoaEdicao: any;

  constructor(private crudService: CrudCepService) { }

  ngOnInit(): void {
    this.getChaveUsuario();
    this.carregarCampoEstado();
  }

  getChaveUsuario() {
    this.crudService.getChaveUsuario(localStorage['username']).subscribe(
      (data: string) => {
        this.chaveUsuario = data;
        this.getDadosPessoa();
      }, (error) => {
        console.error(error);
      }
    );
  }  
  

  getDadosPessoa(){
    this.crudService.getDadosPessoa(this.chaveUsuario).subscribe(data => {
      this.listaPessoas = data;
    })
  }

  cadastrarPessoa(){
    let pessoa: Pessoa = {
      nome: this.nome,
      dataDeNascimento: this.dataNascimento,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      bairro: this.bairro,
      rua: this.rua
    }
    this.listaPessoas.push(pessoa);
    this.atualizarPessoasCadastradas();
    this.limparCampos();
  }

  limparCampos(){
    this.nome = '';
    this.dataNascimento = '';
    this.cep = '';
    this.rua = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.listaCidades = [];
  }

  verificarCarregarEndereco() {
    if(this.cep.length == 8){
      this.crudService.carregarEndereco(this.cep).subscribe((data: any) => {
        console.log(data);
        this.colocouCep = true;
        this.cep = data['cep'];
        this.rua = data['logradouro'];
        this.bairro = data['bairro'];
        this.cidade = data['localidade'];
        this.estado = data['uf'];
      }, erro => {
        console.log(erro);
        this.colocouCep = false;
        this.cep = '';
      });
    } else {
      this.colocouCep = false;
      this.rua = '';
      this.bairro = '';
      this.cidade = '';
      this.estado = '';
    }
  }

  carregarCampoEstado(){
    this.crudService.carregarCampoEstado().subscribe((data: any) => {
      console.log(data)
      this.listaEstados = data;
    })
  }

  editarPessoa(pessoa: any){
    this.modoEdicao = true;

    this.indexPessoaNova = this.listaPessoas.indexOf(pessoa);

    this.nome = pessoa.nome;
    this.dataNascimento = pessoa.dataDeNascimento;
    this.cep = pessoa.cep;
    this.rua = pessoa.rua;
    this.bairro = pessoa.bairro;
    this.cidade = pessoa.cidade;
    this.estado = pessoa.estado;
  }

  async confirmarEdicao() {
    let novaPessoa: Pessoa = {
      nome: this.nome,
      dataDeNascimento: this.dataNascimento,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      bairro: this.bairro,
      rua: this.rua
    }
    this.listaPessoas[this.indexPessoaNova] = { ...novaPessoa };
    try {
      await this.atualizarPessoasCadastradas();
      this.limparCampos();
      this.modoEdicao = false;
    } catch (error) {
      console.log(error);
    }
  }

  atualizarPessoasCadastradas(): any{
    this.crudService.atualizarPessoas(this.chaveUsuario, this.listaPessoas);
  }

  carregarCamposEndereco(event: any) {
    let estadoSelecionado = event.target.value;
    this.crudService.carregarCamposEndereco(estadoSelecionado).then((data: any) => {
      this.listaCidades = data;
    })
  } 
  

  deletarPessoa(pessoa: any) {
    const index = this.listaPessoas.indexOf(pessoa);
    if (index !== -1) {
      this.listaPessoas.splice(index, 1);
      this.atualizarPessoasCadastradas();
    }
  }
}

interface Pessoa {
  nome: string,
  dataDeNascimento: string,
  cep: string,
  estado: string,
  cidade: string,
  bairro: string,
  rua: string
}