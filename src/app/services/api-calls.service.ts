
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as Rx from 'rxjs';
import { HttpService } from './httpReq';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  public reload = new Rx.BehaviorSubject<object>({});
  update = this.reload.asObservable();
  httpOptions = {};
  apiurls = {
    gitUsers: 'https://api.github.com/users',
    searchusers: 'https://api.github.com/search/users',
    repos: (name) => `https://api.github.com/users/${name}/repos`,
  };
  constructor(private http: HttpService) { }

  gitUsers(params, successFunc, errorFunc) {
    const url = `${this.apiurls.gitUsers}?page=${params.page}&per_page=${params.limit}`;
    this.http.getHttp(url, this.httpOptions, successFunc, errorFunc);
  }
  gitSearchUsers(params, successFunc, errorFunc) {
    const url = `${this.apiurls.searchusers}?q=${params.q}`;
    this.http.getHttp(url, this.httpOptions, successFunc, errorFunc);
  }
  getrepo(params, successFunc, errorFunc) {
    const url = `${this.apiurls.repos(params)}`;
    this.http.getHttp(url, this.httpOptions, successFunc, errorFunc);
  }
}
