import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {  };

        if (!request.headers.has('X-Skip-JWT')) {
            const accessToken = this.authenticationService.getAccessToken();
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${accessToken}`},
            });
        }

        request = request.clone({
            setHeaders: headersConfig,
            headers: request.headers.delete('X-Skip-JWT')
        });

        return next.handle(request);
    }
}
