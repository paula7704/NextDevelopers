import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category/category.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { RemoveCategoryComponent } from './category/remove-category/remove-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryCreateComponent,
    EditCategoryComponent,
    RemoveCategoryComponent,
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
