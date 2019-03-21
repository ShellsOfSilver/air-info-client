import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AirCompanyService {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getCompany() {
    return await this.http.get(`api/v1/airCompany/list`).toPromise(); 
  } 

  async removeCompany(companyForm) {
    console.log()
    return await this.http.delete(`api/v1/airCompany/${companyForm._id}`).toPromise(); 
  } 

  async updateCompany(companyForm) {
    return await this.http.put(`api/v1/airCompany/${companyForm._id}`, _.omit(companyForm,['_id'])).toPromise(); 
  } 

  async addCompany(companyForm) {
    return await this.http.post(`api/v1/airCompany/new`,_.omit(companyForm,['_id'])).toPromise(); 
  } 

}
