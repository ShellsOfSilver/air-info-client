import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import * as _ from 'lodash';
import { IAirPlane } from '../dashboard/airplane/admin-airplane/admin-airplane.component';
@Injectable({
  providedIn: 'root'
})
export class AirPlaneService {
  constructor(private http: HttpClient, private userService: UserService,) {
    
  }
  async getPlanes() {
    return await this.http.get(`api/v1/airPlane/list`).toPromise(); 
  } 

  async removePlane(planeForm) {
    console.log()
    return await this.http.delete(`api/v1/airPlane/${planeForm._id}`).toPromise(); 
  } 

  async updatePlane(planeForm: IAirPlane) {
    return await this.http.put(`api/v1/airPlane/${planeForm._id}`, _.omit(planeForm,['_id'])).toPromise(); 
  } 

  async addPlanes(planeForm) {
    return await this.http.post(`api/v1/airPlane/new`,_.omit(planeForm,['_id'])).toPromise(); 
  } 

}
