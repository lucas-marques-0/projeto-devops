import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cadastroService: CadastroService, private router: Router) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  cadastrar() {
    if (this.cadastroForm.invalid) {
      return;
    }
    const username = this.cadastroForm.value.username;
    const password = this.cadastroForm.value.password;
    const endereco = {
      nome: 'nome',
      dataDeNascimento: 'data de nascimento',
      cep: 'cep',
      estado: 'estado',
      cidade: 'cidade',
      bairro: 'bairro',
      rua: 'rua'
    }
    this.cadastroService.cadastrarService({username: username, password: password, enderecos: [endereco]}).then(data => {
      console.log(data);
      this.router.navigate(['']);
    }).catch(erro => {
      console.log(erro);
      swal.fire({
        icon: 'error',
        title: 'Credenciais inválidas',
        text: 'Erro ao cadastrar usuário.',
      });
    })
  }
}
