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
    this.cadastroService.cadastrarService({username, password}).then(data => {
      console.log(data);
      this.router.navigate(['/login']);
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
