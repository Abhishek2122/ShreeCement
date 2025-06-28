import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from './core/services/service.service';
import { BehaviorSubject, filter } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Shree Cement';
  isToken: any = ''
  isLoading: any = new BehaviorSubject(false);

  constructor(
    private mainSerivce: MainService,
    public router: Router,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading$;
    this.mainSerivce.isConnectionAvailable = navigator.onLine;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isToken = localStorage.getItem("token") ?? ""
        if (this.isToken == '' || this.isToken == undefined) {
          this.router.navigate(['/'])
        } else {
          this.mainSerivce.getLoginData().pipe(filter(res => res !== undefined && res !== null)).subscribe(res => {
            this.mainSerivce.USER_DATA.next(res);
          });
        }
      }
    })
  }

}
