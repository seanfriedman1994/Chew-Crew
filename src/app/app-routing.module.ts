import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishCreateComponent } from './dishes/dish-create/dish-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
 
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dishes', component: DishListComponent },
    { path: 'create', component: DishCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:dishId', component: DishCreateComponent, canActivate: [AuthGuard]},
    //lazy loading for auth
    { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}