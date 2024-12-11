import {Location} from '@angular/common';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {HttpStatusCode} from "axios";
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';
import { AlertMessageType } from '../enums/alert-message-type';
import { AlertHelperService } from '../helpers/alert-helper.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private location: Location,
        private alertHelper: AlertHelperService,
        private loaderService: LoaderService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let modifiedRequest = request;

        if (modifiedRequest.headers.has('X-Skip-Interceptor')) {
            modifiedRequest.headers.delete('X-Skip-Interceptor');
            return next.handle(modifiedRequest);
        }

        if (!modifiedRequest.headers.has('X-Skip-Loader')) {
            this.loaderService.start();
            modifiedRequest.headers.delete('X-Skip-Loader');
        }

        return next.handle(modifiedRequest)
            .pipe(
                finalize(() => this.loaderService.stop()),
                tap({
                    next: (success) => {
                        if (success instanceof HttpResponse) {
                            if (!success.body.succeeded && success.body.messages && success.body.messages.length) {
                                success.body.messages.forEach((message: any) => {
                                    this.alertHelper.showAlertMessage(message.message, AlertMessageType.Error);
                                });
                            }
                        }
                    },
                    error: (error) => {
                      debugger
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === HttpStatusCode.Forbidden) {
                              this.alertHelper.showAlertMessage('Forbidden', AlertMessageType.Error);
                            }
                            else if (error.status === HttpStatusCode.Unauthorized) {
                                let openLogin = true;
                                const urlToNavigate = this.location.path();
                                if (urlToNavigate.startsWith('/identity') || !localStorage.getItem('accessToken')) {
                                    openLogin = false;
                                }
                                this.alertHelper.showAlertMessage('Unauthorized', AlertMessageType.Error);
                                // this.authenticationService.removeLocalCredentials(openLogin);
                            } else if (error.error && error.error.messages && error.error.messages.length) {
                                error.error.messages.forEach((message: any) => {
                                    this.alertHelper.showAlertMessage(message.message, AlertMessageType.Error);
                                });
                            } else {
                                this.alertHelper.showAlertMessage('Error Occurs!', AlertMessageType.Error);
                            }
                        }
                        this.loaderService.stop()
                    },
                })
            );
    }

}
