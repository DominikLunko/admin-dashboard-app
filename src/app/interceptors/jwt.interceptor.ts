import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})


export class JwtInterceptor implements HttpInterceptor {

    constructor (private userService: UserService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> 
    {
        // add authorization header with jwt token if available
        let currentuser = this.userService.currentUser.getValue();
        let token = ('; '+document.cookie).split(`; jwt=`).pop()?.split(';')[0];
        console.log(token);

        while (currentuser && token !== undefined) 
        {
            request = request.clone({
                setHeaders: 
                {
                     Authorization: `Bearer ${token}` 
                    
                }
            });
        }

        return next.handle(request);
    }
}