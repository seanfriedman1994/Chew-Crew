import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishCreateComponent } from './dishes/dish-create/dish-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
 
const routes: Routes = [
    { path: '', component: DishListComponent },
    { path: 'create', component: DishCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:dishId', component: DishCreateComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}