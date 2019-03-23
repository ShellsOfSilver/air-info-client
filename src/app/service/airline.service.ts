import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AirLineService {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getAirLine() {
    return await this.http.get(`api/v1/airLine/list`).toPromise(); 
  } 

  async removeAirLine(airLineForm) {
    return await this.http.delete(`api/v1/airLine/${airLineForm._id}`).toPromise(); 
  } 

  async updateAirLine(airLineForm) {
    return await this.http.put(`api/v1/airLine/${airLineForm._id}`, _.omit(airLineForm,['_id'])).toPromise(); 
  } 

  async addAirLine(airLineForm) {
    return await this.http.post(`api/v1/airLine/new`,_.omit(airLineForm,['_id'])).toPromise(); 
  } 

}
