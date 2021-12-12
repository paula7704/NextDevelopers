import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateUserComponent } from './user/create-user/create-user.component';



import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

const routes: Routes = [
 
  {
    path: "product-create",
    component: CreateProductComponent
  },
  {
    path: "product-edit",
    component: EditProductComponent
  },
  {
    path: "product",
    component: ListProductComponent
  },
  {
    path: "user-create",
    component: CreateUserComponent 
  },
  {
    path: "user-edit",
    component: EditUserComponent
  },
  {
    path: "user",
    component: ListUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
