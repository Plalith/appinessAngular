import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
    }
    getHttp(apiUrl, options, successFunc, errorFunc) {
        return this.http.get(apiUrl, options).subscribe(successFunc, errorFunc);
    }
    postHttp(apiUrl, data, options, successFunc, errorFunc) {
        return this.http.post(apiUrl, data, options).subscribe(successFunc, errorFunc);
    }
    putHttp(apiUrl, data, options, successFunc, errorFunc) {
        return this.http.put(apiUrl, data, options).subscribe(successFunc, errorFunc);
    }
}
