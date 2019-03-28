import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatChipsModule, MatDividerModule, MatListModule, MatIconModule, MatPaginatorModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DishesComponent } from './dishes/dishes.component';
import { GroupsComponent } from './groups/groups.component';
import { RequestDishComponent } from './request-dish/request-dish.component';
import { ProfileComponent } from './profile/profile.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { DishCreateComponent } from './dishes/dish-create/dish-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


@NgModule({
  declarations: [
    GroupListComponent,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DishesComponent,
    GroupsComponent,
    RequestDishComponent,
    ProfileComponent,
    DishListComponent,
    ProfileEditComponent,
    FavoritesComponent,
    DishCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
