import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceAWS {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getUser(id: any) {
    return await this.http.get(`/api/v1/auth/${id}`).toPromise(); 
  } 

  async signin(authData: any) {
    this.userService.removeCurrentUser(); 
    return await this.http.post(`api/v1/user/singIn`, authData).toPromise(); 
  }

  async _localsignin(authData: any) {
    return await this.http.get(`/api/v1/auth/${authData.id}`).toPromise(); 
  }

  async getAllUsers() {
    return await this.http.get(`/api/v1/auth`).toPromise(); 
  }

  async updateUser(id: string, data) {
    return await this.http.put(`/api/v1/auth/${id}`, data).toPromise(); 
  }

  async signup(authData: any) {
    return await this.http.post('/api/v1/auth', authData).toPromise();
  }

}
