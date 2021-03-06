import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name: String;
    username: String;
    email: String;
    password: String;
  constructor( 
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService ,
    private router:Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    console.log("registering");
    const user = {
      name: this.name,
      username:this.username,
      email: this.email,
      password:this.password
    }
  console.log(user);
    /* Required Fields */
  if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }
    console.log("ansh");
  /* Validate Email */
  if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
    return false;
  }
  //Register user
  this.authService.registerUser(user).subscribe(data => {
    if(data.success){
      this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/login']);
      console.log("registered")
    }else{
      this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/register']);
    }
  })
  }
}
