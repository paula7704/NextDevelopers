import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryComponent } from './category/category/category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { RemoveCategoryComponent } from './category/remove-category/remove-category.component';

const routes: Routes = [
  {
    path: "category-list",
    component: CategoryComponent
  },
  {
    path: "category-create",
    component: CategoryCreateComponent
  },
  {
    path: "category-edit",
    component: EditCategoryComponent
  },
  {
    path: "remove-category",
    component: RemoveCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
