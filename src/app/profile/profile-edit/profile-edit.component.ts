import { Component, OnInit, OnDestroy} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { User } from '../../models/interface-models';
import { mimeType } from '../../dishes/dish-create/mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy{
  enteredName = "";
  enteredEmail = "";
  enteredBio = "";
  profile: User;
  private email: string;
  private id: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  constructor(public profileService: ProfileService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() 
  {
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(getAuthStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'bio': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        //validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('id')) 
      {
        this.id = paramMap.get('id');
        this.email = localStorage.getItem("email");
        console.log(this.id);
        console.log(this.email);
        this.isLoading = true;
        this.profileService.fetchProfile(this.email).subscribe(profileData => { 
          this.isLoading = false;
          this.profile = 
          {
            id: profileData._id,
            email: profileData.email, 
            name: profileData.name, 
            bio: profileData.bio,
            image: profileData.image,
          };
          this.form.setValue({
            'name': this.profile.name,
            'bio': this.profile.bio,
            'image': this.profile.image
          });
          this.imagePreview = this.profile.image;
        });
      }else
      {
        this.email = null;
      }
    });
  }

  onImagePicked(event: Event) 
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveProfile()
  {
    if(this.form.invalid)
    {
      return;
    }
    this.isLoading = true;
    this.profileService.updateProfile(
        this.id,
        this.email, 
        this.form.value.name, 
        this.form.value.bio,
        this.form.value.image
        );
    this.form.reset();
  }

  ngOnDestroy() 
  {
    this.authStatusSub.unsubscribe();
  }
}
