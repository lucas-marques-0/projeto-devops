import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logar() {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.logarService({username, password}).subscribe((data: any) => {
      if(this.verificarLogin(data, username, password)){
        this.loginForm.get('username')?.setValue('');
        this.loginForm.get('password')?.setValue('');
        this.router.navigate(['/crud-cep']);
      } else {
        swal.fire({
          icon: 'error',
          title: 'Credenciais inválidas',
          text: 'Usuário ou senha incorretos',
        });
      }
    }, erro => {
      console.log(erro)
    })
  }

  verificarLogin(lista: { username: string, password: string }[], username: string, password: string): boolean {
    for (let i = 0; i < lista.length; i++) {
      const obj = lista[i];
      if (obj.username === username && obj.password === password) {
        return true;
      }
    }
    return false;
  }
  
}
