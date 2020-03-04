import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit, OnDestroy {

  Data = [];
  TableOption: any = {
    DataCount: '-',
    params: null,
  };
  Support = 0;
  subscribe: Subscription;
  search = new FormControl('');
  constructor(private route: ActivatedRoute, private router: Router, private API: ApiCallsService) { }

  searchbar = false;
  gitusers = true;
  repousername = '';

  ngOnInit() {
    this.InitialLoad();
  }
  getrepo(name) {
    this.getGitRepoData(name);
    this.repousername = name;
    this.gitusers = false;
  }
  goback() {
    this.gitusers = true;
    this.loadSearchResults();
  }
  getGitRepoData(name) {
    this.API.getrepo(name, ((response) => {
      this.Data = response;
      this.TableOption.DataCount = 3000;
      this.Support = Math.random();
    }), ((error) => {
      console.log(error);
    }));
  }
  InitialLoad() {
    this.subscribe = this.route.params.subscribe((params) => {
      this.TableOption.params = params;
      this.GetRecords(params.lmt, params.page);
    });
  }
  loadSearchResults() {
    if (this.search.value == '') {
      this.GetRecords(this.TableOption.params.lmt, this.TableOption.params.page);
    } else {
      this.GetSearchRecords(this.TableOption.params.lmt, 1);
    }

  }
  GetSearchRecords(limitt, pagee) {
    this.searchbar = true;
    this.API.gitSearchUsers({ q: this.search.value, limit: limitt, page: pagee }, ((response) => {
      this.Data = response.items;
      this.TableOption.DataCount = response.total_count;
      this.Support = Math.random();
    }), ((error) => {
      console.log(error);
    }));
  }
  GetRecords(limitt, pagee) {
    this.searchbar = false;
    this.API.gitUsers({ limit: limitt, page: pagee }, ((response) => {
      this.Data = response;
      this.TableOption.DataCount = 3000;
      this.Support = Math.random();
    }), ((error) => {
      console.log(error);
    }));
  }
  UpdateCmpData(data) {
    this.TableOption = data;
    this.router.navigate(['../../', data.params.lmt, data.params.page], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
