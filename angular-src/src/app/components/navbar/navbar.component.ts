import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { UserPOJO } from '../../dto/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userObject : UserPOJO.UserDTO = JSON.parse(localStorage.getItem('user'));;
name :  String = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashmessage: FlashMessagesService) { }

  ngOnInit() {
    if(this.userObject!=null)
      this.name = this.userObject.username;
  }


  onLogoutClick(){
    this.authService.logoutClick();
    this.flashmessage.show('Logout Successful', {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['login']);
    return false;
  }
}
