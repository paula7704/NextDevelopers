import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  get GetForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  CreateForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  SaveRecord(){
    let model = new CategoryModel();
    let name = this.GetForm['name'].value;
    this.categoryService.SaveRecord(model).subscribe({
      next:(data:CategoryModel)=>{
        console.log("Guardando");
        this.router.navigate(["parameters/category-list"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
