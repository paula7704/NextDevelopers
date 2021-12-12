import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { GeneralData } from 'src/app/config/general-data';
import { SessionData } from 'src/app/models/session-data.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CreateForm();
  }
  CreateForm() {
    this.form = this.fb.group({
      email: [
        'example@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(GeneralData.EMAIL_MIN_LENGTH),
        ],
      ],
      password: [
        '************',
        [
          Validators.required,
          Validators.minLength(GeneralData.PASSWORD_MIN_LENGTH),
          Validators.maxLength(GeneralData.PASSWORD_MAX_LENGTH),
        ],
      ],
    });
  }

  get GetForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  Login() {
    if (this.form.invalid) {
      console.log(GeneralData.INVALID_FORM_MESSAGE);
    } else {
      console.log(JSON.stringify(this.form.value, null, 2));

      let email = this.GetForm['email'].value;
      let password = MD5(this.GetForm['password'].value).toString();
      this.router.navigate(['/home']);
      this.securityService.Login(email, password).subscribe((data: any) => {
        this.localStorageService.SaveSessionData(data);
      },(error:any)=>{
        alert("Datos inválidos")
      });
    }
  }
}
