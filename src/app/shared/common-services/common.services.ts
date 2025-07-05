import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    headers = { 'content-type': 'application/json' };
    USER_DATA: BehaviorSubject<any> = new BehaviorSubject(undefined);
    DEPOT_DATA: BehaviorSubject<any> = new BehaviorSubject(undefined);
    GRADE_DATA: BehaviorSubject<any> = new BehaviorSubject(undefined);
    USER_DATA_OBJECT: any;
    ENV_TYPE: string = environment.envType;

    constructor(
        private http: HttpClient,
        public router: Router) {
    }

    get isToken() {
        const token = localStorage.getItem("token");
        return (token != "" && token != undefined && token != null) ? true : false
    }

    getLoginData() {
        const data = localStorage.getItem("UserData") ?? "";
        this.USER_DATA_OBJECT = (data != undefined && data != "") ? JSON.parse(data) : {}
        return new BehaviorSubject(this.USER_DATA_OBJECT)
    }


    loadCommonAPI() {
        forkJoin({
            depot: this.getDepotCode(),
            grade: this.getGradeData()
        }).subscribe(({ depot, grade }) => {
            this.DEPOT_DATA.next(depot);
            this.GRADE_DATA.next(grade?.data);
        });
    }

    getGradeData(): Observable<any> {
        return this.http.get<any>(`${environment.NewBaseUrl + 'common/grade-details'}`, { 'headers': this.headers });
    }

    getDepotCode() {
        return this.http.get<any>(`${environment.NewBaseUrl + 'common/depot'}`)
    }

}