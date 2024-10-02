import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.token) {
            this.authService.saveToken(response.token);
            this.authService.getUser().subscribe((user) => {
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/spaces']);
            });
          } else {
            this.errorMessage = 'Error en la respuesta del servidor. Inténtalo de nuevo.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      });
    }
  }
}
