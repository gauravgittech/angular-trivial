import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {mergeMap, delay, retryWhen} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries && error.status == 500) {
              return of(error).pipe(delay(delayMs));
            }
            this.toastr.error(error,'Something went wrong')
            throw error;
          })
        )
      }
      )
    )
  }
};

