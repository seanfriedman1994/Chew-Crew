import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishCreateComponent } from './dishes/dish-create/dish-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
 
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile/edit/:id', component: ProfileEditComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'dishes', component: DishListComponent },
    { path: 'dishes/create', component: DishCreateComponent, canActivate: [AuthGuard] },
    { path: 'dishes/edit/:dishId', component: DishCreateComponent, canActivate: [AuthGuard]},
    //lazy loading for auth
    { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}