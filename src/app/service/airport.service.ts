import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AirPortService {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getPort(filter = "") {
    return await this.http.get(`api/v1/airPort/list?filter=${filter}`).toPromise(); 
  } 

  async getPortId(id) {
    return await this.http.get(`api/v1/airPort/${id}`).toPromise(); 
  } 

  async getCountries() {
    return await this.http.get('api/v1/airPort/countries' ).toPromise(); 
  } 

  async removePort(portForm) {
    console.log()
    return await this.http.delete(`api/v1/airPort/${portForm._id}`).toPromise(); 
  } 

  async updatePort(portForm) {
    return await this.http.put(`api/v1/airPort/${portForm._id}`, _.omit(portForm,['_id'])).toPromise(); 
  } 

  async addPort(portForm) {
    return await this.http.post(`api/v1/airPort/new`,_.omit(portForm,['_id'])).toPromise(); 
  } 

}
