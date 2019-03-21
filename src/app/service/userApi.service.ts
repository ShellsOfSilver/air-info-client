import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getUser() {
    return await this.http.get(`api/v1/user/list`).toPromise(); 
  } 

  async removeUser(userForm) {
    console.log()
    return await this.http.delete(`api/v1/user/${userForm._id}`).toPromise(); 
  } 

  async updateUser(userForm) {
    return await this.http.put(`api/v1/user/${userForm._id}`, _.omit(userForm,['_id'])).toPromise(); 
  } 

  async addUser(userForm) {
    return await this.http.post(`api/v1/user/singUp`,_.omit(userForm,['_id'])).toPromise(); 
  } 

}
