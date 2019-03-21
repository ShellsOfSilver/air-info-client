import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders, HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from './service/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RootHttpInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const user = this.userService.getCurrentUser();
    if(!request.url.startsWith('http')){
      request = request.clone({url: `http://localhost:3000/${request.url}`});
    }
    if(user){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + user.accessToken) });
    }
    //console.log(request)
    return request;
  }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthHeader(req)).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              //console.log('event--->>>', event);
          }
          return event;
      }));
  }

}