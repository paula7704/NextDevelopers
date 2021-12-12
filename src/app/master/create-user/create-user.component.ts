import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import validation from '../../validations/validation';
/* import {DatabaseService} from '../../services/database.service' */
import { Contacts } from '../../models/contacts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup=new FormGroup({
    user_name:new FormControl(''),
    lastname:new FormControl(''),
    mother_lastname:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl(''),
    acceptTerms:new FormControl(false)
  });
  submitted=false;
  database: any;

  constructor(private formBuilder:FormBuilder, /* database:DatabaseService */) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group(
      {
      user_name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      lastname: ['',Validators.required],
      mother_lastname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      confirmPassword: ['',Validators.required],
      acceptTerms:[false, Validators.requiredTrue]      
     },
     {Validators: [validation.match('Password','confirmPassword')]}
    )
  }
  get f():{[key:string]:AbstractControl}{
    return this.form.controls;
  }
  OnSubmit():void{
    this.submitted=true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value,null,2));
  }
  //boton para eliminar el contenido de los campos
  OnReset():void{
    this.submitted=false;
    this.form.reset();
  }

  addContactToDatabase(email:string, user_name:string,lastname:string,password:string): any{
    const contact: Contacts={email,user_name,lastname,password};
    return this.database.set(contact,`contacts/${email}`)
  }

}
