import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ModalComponent],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      const role = this.tokenService.getUser().role;
      if (role === '1') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/worker']);
      }
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  get form() {
    return this.loginForm.controls;
  }

  //error message handler
  errorMsg = '';
  showErrorMsg() {
    if (this.form.email.touched && this.form.email.invalid)
      this.errorMsg = 'Please, enter email address';
    else if (this.form.password.touched && this.form.password.invalid)
      this.errorMsg = 'Please enter password';
    else this.errorMsg = '';
  }

  loadingState: boolean = false;
  onSubmit() {
    this.loadingState = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginForm.reset();

    setTimeout(() => {
      this.authService.login(email, password).subscribe(
        (data) => {
          this.tokenService.saveToken(data);

          //redirecting based on user role
          switch (this.tokenService.getUser().role) {
            case '1':
              this.router.navigate(['/admin']);
              break;
            case '2':
              this.router.navigate(['/worker']);
              break;
            default:
              console.error('Incorrect user role');
          }

          this.loadingState = false;
        },
        (err) => {
          console.error(err.message);
          this.notificationService.showModal('login-error');
          this.loadingState = false;
        }
      );
    }, 1600);
  }
}
