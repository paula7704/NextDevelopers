import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.css']
})
export class RemoveCategoryComponent implements OnInit {
  id: string = "";
  name: string ="";
  constructor(private router: Router, 
            private service: CategoryService,
            private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next:(data:CategoryModel) =>{
        if(data.id && data.name){
          this.id = data.id;
          this.name = data.name;
        }
      }
    });
  }

  RemoveRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.RemoveRecord(id).subscribe({
      next:(data: CategoryComponent)=>{
        this.router.navigate(["/parameters/category-list"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}
