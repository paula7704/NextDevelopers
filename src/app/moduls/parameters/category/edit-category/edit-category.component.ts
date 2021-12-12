import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get GetForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next:(data:CategoryModel) =>{
        this.GetForm['id'].setValue(data.id);
        this.GetForm['name'].setValue(data.name);
      }
    })
  }

  SaveRecord(){
    let model = new CategoryModel();
    model.id =  this.GetForm['id'].value;
    model.name =  this.GetForm['name'].value;
    this.service.EditRecord(model).subscribe({
      next:(data: CategoryModel)=>{
        console.log(data);
        this.router.navigate(["/parameters/category-list"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })

  }

}
