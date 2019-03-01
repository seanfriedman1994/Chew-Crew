import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DishesComponent } from './dishes/dishes.component';
import { GroupsComponent } from './groups/groups.component';
import { RequestDishComponent } from './request-dish/request-dish.component';
import { DishDetailComponent } from './dishes/dish-detail/dish-detail.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishItemComponent } from './dishes/dish-list/dish-item/dish-item.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DishesComponent,
    GroupsComponent,
    RequestDishComponent,
    DishDetailComponent,
    SignUpComponent,
    ProfileComponent,
    DishListComponent,
    DishItemComponent,
    GroupEditComponent,
    ProfileEditComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
