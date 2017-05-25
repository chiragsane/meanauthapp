import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { UserPOJO } from '../dto/user';

@Injectable()
export class AuthService {
authToken: any;
user: any;
qualification: any;
userDTO: UserPOJO.UserDTO;

  constructor(private http: Http) { }

  registerUser(user){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());
  }  

  authenticateUser(user){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());
  } 

  createQual(qualification){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/qualification/dashboard', qualification, {headers: headers}).map(res => res.json());
  } 

  updateQual(selQualification){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/qualification/updateQualData', selQualification, {headers: headers}).map(res => res.json());
  }

   delQual(id){
      const userId = {
      _id: id
    }
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/qualification/delQualData', userId, {headers: headers}).map(res => res.json());
  }

  getQual(){
    this.userDTO = JSON.parse(localStorage.getItem("user"));
    const userObject = {
      user: this.userDTO.username
    }
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/qualification/qualData', userObject, {headers: headers}).map(res => res.json());
  } 

  getProfile(){
    let headers= new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}).map(res => res.json());
  }

  
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.authToken = token;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logoutClick(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
