import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, first, Observable, shareReplay, Subject } from 'rxjs';
import moment from 'moment';
import { CookiesService } from './cookies.service';
import { CustomToolTipsService } from './custom-tool-tips.service';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  InwardShow: boolean = false;
  OutwardShow: boolean = false;
  islogged: boolean = false;
  CUSTOM_POPUP_SHOW_HIDE: boolean = false;
  isConnectionAvailable: boolean = false;
  INWARD_DATA: any = [];
  OUTWARD_DATA: any = [];
  DAMAGE_OUTWARD_DATA: any = [];
  DAMAGE_OUTWARD_SUM: any = 0;
  DAMAGE_INWARD_DATA: any = [];
  DAMAGE_INWARD_SUM: any = 0;
  STOCK_SHEET_DATA: any = [];
  NEW_STOCK_SHEET_DATA: any = [];
  NEW_STOCK_SHEET_DATA_2: any = [];
  DATA: any = [];
  PARSE_FLOAT: any = 0;
  GRADE_LIST: any = [];
  headers = { 'content-type': 'application/json' };
  CONVERT_TON_BAG = 20;
  VIEW_SHOW_HIDE = false;
  CORRECTION_REPORT_DATA: any = [];
  OUTWARD_TRANSPORTER_REPORT_DATA: any = [];
  ALL_OUTWARD_TRANSPORTER_REPORT_DATA: any = [];
  DhandhaniaTransporter_REPORT_DATA: any = [];
  DhandhaniaTransporterRoute_REPORT_DATA: any = [];
  DSR_REPORT_DATA: any = [];
  DSR_REPORT_DATA_2: any = [];
  DSR_REPORT_DATA_3: any = [];
  INWARD_OUTWARD_DIFF: any = [];
  PASSWORD_SHOW_HIDE: boolean = true;
  LABOUR_DATA: any = [];
  depot_validation: any = [
    "A150",
    "A149",
    "A148",
    "A001",
    "A002",
    "A154",
    "A153",
    "A014",
    "A013",
    "A151",
    "A304",
    "A266",
    "A175",
    "A172",
    "A456"
  ];
  DEALER_NAME_LIST: any = [];
  environment = environment;
  TITLE_OF_PAGE: string = ''
  USER_DATA: BehaviorSubject<any> = new BehaviorSubject(undefined);
  USER_DATA_OBJECT: any;
  ENV_TYPE: string = environment.envType;
  TITLE_OF_PAGE_BehaviorSubject:BehaviorSubject<any> = new BehaviorSubject('');
  
  constructor(private http: HttpClient,
    public router: Router,
    public cookieService: CookiesService,
    public notifyService: NotificationService,
    public animation_loader: CustomToolTipsService) {
    this.islogged = false;
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

  uploadApiCheck() {
    return this.http.get<any>(`${this.environment.NewBaseUrl}/`, { 'headers': this.headers })
  }

  LoginService(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'LoginDB/Logindb.php'}`, formdata, { 'headers': this.headers });
  }

  LoginNewService(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.NewBaseUrl + 'auth/login'}`, formdata, { 'headers': this.headers });
  }

  ResetPassordService(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'LoginDB/ResetPassword.php'}`, formdata, { 'headers': this.headers });
  }
  InsertInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardInsert.php'}`, formdata, { 'headers': this.headers });
  }
  UpdateInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardUpdate.php'}`, formdata, { 'headers': this.headers });
  }

  UpdateSwapInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardSwapUpdate.php'}`, formdata, { 'headers': this.headers });
  }

  UpdateSwapOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardSwapUpdate.php'}`, formdata, { 'headers': this.headers });
  }

  DeleteInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardDelete.php'}`, formdata, { 'headers': this.headers });
  }

  InwardUpload(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardBulkUpload.php'}`, formdata, {
      'headers': this.headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  FileUpload(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/FileUpload.php'}`, formdata, { 'headers': this.headers });
  }

  DeleteFileUpload(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/FileUploadDelete.php'}`, formdata, { 'headers': this.headers });
  }

  getFactoryArrival(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/getFactoryArrival.php'}`, data, { 'headers': this.headers });
  }

  InserOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardInsert.php'}`, formdata, { 'headers': this.headers });
  }

  UpdateOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardUpdate.php'}`, formdata, { 'headers': this.headers });
  }
  DeleteOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardDelete.php'}`, formdata, { 'headers': this.headers });
  }

  OutwardUpload(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardBulkUpload.php'}`, formdata, {
      'headers': this.headers, reportProgress: true,
      observe: 'events'
    });
  }

  OutwardUploadNew(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.NewBaseUrl + 'OutwardSheet/OutwardBulkUpload'}`, formdata, {
      'headers': this.headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  InwardUploadNew(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.NewBaseUrl + 'InwardSheet/InwardBulkUpload'}`, formdata, {
      'headers': this.headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  FactoryArrivalUpload(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/FactoryArrivalUpload.php'}`, formdata, {
      'headers': this.headers, reportProgress: true,
      observe: 'events'
    });
  }

  DealerInsert(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Depot_Data/DealerInsert.php'}`, formdata, { 'headers': this.headers });
  }

  DealerUpdate(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Depot_Data/DealerUpdate.php'}`, formdata, { 'headers': this.headers });
  }

  GradeInsert(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/GradeInsert.php'}`, formdata, { 'headers': this.headers });
  }

  getFileUploadData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/getFileUpload.php'}`, formdata, { 'headers': this.headers });
  }

  getAllFileUploadData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/getAllFileUploadData.php'}`, formdata, { 'headers': this.headers });
  }

  EmployeesInsert(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/EmplyoeesInsert.php'}`, formdata, { 'headers': this.headers });
  }

  DepotInsert(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/DepotInsert.php'}`, formdata, { 'headers': this.headers });
  }

  AttendanceInsert(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/AttendanceInsert.php'}`, formdata, { 'headers': this.headers });
  }

  getInwardTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.NewBaseUrl + 'InwardSheet/in-table-data'}`, DATA).subscribe((res) => {
          if (res['response']['status']) {
            this.INWARD_DATA = res['data'];
            resolve(res);
          } else {
            this.INWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Inward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.INWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getInwardSwapTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardSwapSheetView.php'}`, DATA).subscribe((res) => {
          if (res['response']['status']) {
            this.INWARD_DATA = res['data'];
            resolve(res);
          } else {
            this.INWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Inward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.INWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getOutwardTableData(DATA: any) {
   this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.NewBaseUrl + 'OutwardSheet/get'}`, DATA).subscribe((res) => {
          if (res['response']['status']) {
            this.INWARD_DATA = res['data'];
            resolve(res);
          } else {
            this.INWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Inward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.INWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getOutwardSwapTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutWardSwapData.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
          if (res['response']['status']) {
            this.OUTWARD_DATA = res['data'];
            resolve(res);
          } else {
            this.OUTWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Outward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.OUTWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getDamageOutwardTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutWardDamageData.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
          if (res['response']['status']) {
            this.DAMAGE_OUTWARD_DATA = res['data'];
            this.DAMAGE_OUTWARD_SUM = 0;
            this.DAMAGE_OUTWARD_DATA?.forEach((element: { [x: string]: string; }) => {
              this.DAMAGE_OUTWARD_SUM += parseFloat(element['invoiceQt']) / 20;
            });
            resolve(res);
          } else {
            this.DAMAGE_OUTWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Outward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.DAMAGE_OUTWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getDamageInwardTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'InwardSheet/InwardDamageData.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
          if (res['response']['status']) {
            this.DAMAGE_INWARD_DATA = res['data'];
            this.DAMAGE_INWARD_SUM = 0;
            this.DAMAGE_INWARD_DATA?.forEach((element: { [x: string]: string; }) => {
              this.DAMAGE_INWARD_SUM += parseFloat(element['invoiceQty']) / 20;
            });
            resolve(res);
          } else {
            this.DAMAGE_INWARD_DATA = [];
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Outward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.DAMAGE_INWARD_DATA = [];
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getStockTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.NewBaseUrl + 'common/stock-report'}`, DATA, { 'headers': this.headers }).subscribe((res) => {
          if (res['Status'] == true) {
            this.STOCK_SHEET_DATA = { 'data': (res['data']) };
            resolve(res);
            this.animation_loader.removeAnimation();
          } else {
            this.STOCK_SHEET_DATA = [];
            resolve([]);
            this.animation_loader.removeAnimation();
          }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.STOCK_SHEET_DATA = [];
        reject(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getLabourTable(DATA: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/getLabourTable.php'}`, DATA, { 'headers': this.headers }).toPromise();
  }

  getLabourTableAllDepot(DATA: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Labour_Report/Labour_reportAllDepot.php'}`, DATA, { 'headers': this.headers }).toPromise();
  }

  getNewStockTableData(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.NewBaseUrl + 'NewStockSheet/get-stock-records'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
          if (res['Status'] == true) {
            this.NEW_STOCK_SHEET_DATA = res['data'];
            resolve(res);
            this.animation_loader.removeAnimation();
          } else {
            this.NEW_STOCK_SHEET_DATA = [];
            resolve([]);
            this.animation_loader.removeAnimation();
          }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.NEW_STOCK_SHEET_DATA = [];
        reject(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getNewStockTableData_2(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'Sheet/NewStockSheet/newstock2.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
          if (res['Status'] == true) {
            var OBJECT_KEY = res['DEPOT_LIST'];
            OBJECT_KEY.sort();
            this.NEW_STOCK_SHEET_DATA_2 = {
              'DEPOT_LIST': OBJECT_KEY,
              'DATA': res
            }
            resolve(res);
            this.animation_loader.removeAnimation();
          } else {
            this.NEW_STOCK_SHEET_DATA_2 = [];
            resolve([]);
          }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        this.NEW_STOCK_SHEET_DATA = [];
        reject(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  getEwaybill(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Sheet/ewaybill/ewaybill.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => { resolve(res); this.animation_loader.removeAnimation(); });
    });
  }

  getByEwaybill(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Sheet/ewaybill/byewaybill.php'}`, DATA, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => { resolve(res); this.animation_loader.removeAnimation(); });
    });
  }

  ALLDepotCode() {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.NewBaseUrl + 'common/depot'}`).subscribe((res) => {
        resolve(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.notifyService.showError(err['message'], err['statusText']);
        this.animation_loader.removeAnimation();
      });
    });
  }

  Dealer_Details() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.baseUrl + 'Depot_Data/DealerDetails.php'}`).pipe(delay(2000)).subscribe((res) => {
        resolve(res);
        this.animation_loader.removeAnimation();
      }, err => {
        this.animation_loader.removeAnimation();
      });
    });
  }

  EmpList() {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.baseUrl + 'Depot_Data/EmpData.php'}`).pipe(delay(2000)).subscribe((res) => {
        resolve(res);
        this.animation_loader.removeAnimation();
      }, err => {
        this.animation_loader.removeAnimation();
      });
    });
  }

  ALLDealer_Details() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.baseUrl + 'Depot_Data/ALL_DEALER_DETAILS.php'}`).subscribe((res) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getSessionLogin() {
    return this.getLoginData();
  }

  LogoutSession() {
    this.islogged = false;
    localStorage.removeItem("token")
    this.router.navigate(['/Login']);
  }
  capitalizeFirstLetter(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  ParseFloat(value: any): any {
    this.PARSE_FLOAT = parseFloat(value) / this.CONVERT_TON_BAG;
    let num1: any = parseFloat(this.PARSE_FLOAT).toFixed(2);
    if (parseFloat(value) == 0 || value == undefined) {
      return 0.0;
    } else {
      return !isNaN(num1) ? num1 : 0;
    }
  }

  isLoginCheck() {
    // if (this.getSessionLogin()?.LoginStatus == true) {
    //   if (this.cookieService.getCookie('AttendanceSheet') == '' ||
    //     this.getSessionLogin()['Depot_Code'] != this._getAttendancelogin()['Depot_Code'] ||
    //     this.cookieService.getCookie('AttendanceSheet') == undefined) {
    //     this.router.navigate(['/AttendanceSheet']);
    //     this.islogged = false;
    //   } else {
    //     this.islogged = true;
    //   }
    // } else {
    //   this.islogged = false;
    //   this.router.navigate(['/Login']);
    // }
    return this.islogged;
  }

  getGradeList() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.NewBaseUrl + 'common/grades'}`).subscribe((res) => {
        this.GRADE_LIST = res['data'];
        resolve(res['data']);
      }, err => {
        this.notifyService.showError(err['message'], err['statusText']);
        resolve([err]);
      });
    });
  }

  getGradeListData() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.NewBaseUrl + 'common/grade-details'}`).subscribe((res) => {
        resolve(res['data']);
      }, err => {
        this.notifyService.showError(err['message'], err['statusText']);
        resolve([err]);
      });
    });
  }

  getMonthYear(date: string) {
    var dateObj = new Date(date);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.toLocaleDateString('default', { weekday: 'long' });
    var year = dateObj.getUTCFullYear();
    return { Month: month, Year: year, Day: day }
  }

  getMonthYear2(date: string) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    var date_changed: any = [];
    if (date?.indexOf('/') != -1) {
      date_changed = date?.split('/');
      if (date_changed[0] > 10) {
        date_changed = date_changed[1] + '-' + date_changed[0] + '-' + date_changed[2];
      } else {
        date_changed = date;
      }
    }
    if (date?.indexOf('-') != -1) {
      date_changed = date?.split('/');
      if (date_changed[0] > 10) {
        date_changed = date_changed[1] + '-' + date_changed[0] + '-' + date_changed[2];
      } else {
        date_changed = date;
      }
    }
    var dateObj = new Date(date_changed);
    return { Month: monthNames[dateObj.getMonth()], Year: dateObj.getFullYear(), date: date_changed, DayOfWeek: this.getDayOfWeek(date_changed) }
  }

  getDayOfWeek(date: any) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  getCorrectionReportData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Correction_Report/Correction_report.php', data).pipe(delay(2000)).subscribe((res) => {
        resolve(res);
        this.CORRECTION_REPORT_DATA = res;
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.CORRECTION_REPORT_DATA = [];
        this.animation_loader.removeAnimation();
      });
    });
  }

  getTransporterData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Admin/getOutwardTransporter.php', data).pipe(delay(2000)).subscribe((res: any) => {
        resolve(res);
        this.OUTWARD_TRANSPORTER_REPORT_DATA = res?.response?.result;
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.OUTWARD_TRANSPORTER_REPORT_DATA = [];
        this.animation_loader.removeAnimation();
      });
    });
  }

  getAllTransporterData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Admin/getAllOutwardTransporter.php', data).pipe(delay(2000)).subscribe((res: any) => {
        resolve(res);
        this.ALL_OUTWARD_TRANSPORTER_REPORT_DATA = res?.response?.result;
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.ALL_OUTWARD_TRANSPORTER_REPORT_DATA = [];
        this.animation_loader.removeAnimation();
      });
    });
  }

  getDhandhaniaTransporterData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Admin/getFreightTransporter.php', data).pipe(delay(2000)).subscribe((res: any) => {
        resolve(res);
        this.DhandhaniaTransporter_REPORT_DATA = res?.response?.result;
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.DhandhaniaTransporter_REPORT_DATA = [];
        this.animation_loader.removeAnimation();
      });
    });
  }

  getDhandhaniaTransporterRouteData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Admin/getFreightTransporterRoute.php', data).pipe(delay(2000)).subscribe((res: any) => {
        resolve(res);
        this.DhandhaniaTransporterRoute_REPORT_DATA = res?.response?.result;
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.DhandhaniaTransporterRoute_REPORT_DATA = [];
        this.animation_loader.removeAnimation();
      });
    });
  }
  updateDhandhaniaTransporterRouteData(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Admin/updateFreightTransporter.php', data).pipe(delay(2000)).subscribe((res: any) => {
        resolve(res);
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.animation_loader.removeAnimation();
      });
    });
  }
  getCorrectionReportData_2(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.getDataApi('Sheet/Correction_Report/getData.php', data).subscribe((res) => {
        resolve(res);
        console.log(res);
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err);
        this.animation_loader.removeAnimation();
      });
    });
  }
  getDataApi(URL: string, data: any): Observable<Object[]> {
    return this.http.post<any>(`${environment.baseUrl + URL}`, data, { 'headers': this.headers }).pipe(
      shareReplay(),
      first());
  }

  getPercentaged_data(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/PercentageInwardOutward/PercentageInwardOutwardSheet.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  getAttendanceReport_data(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/getAttendanceReport.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  UpdateDepot(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/DepotUpdate.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  UpdateAttendanceReport(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/updateAttenadanceReport.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  UpdateEmp(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/EmpUpdate.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  UpdateGrade(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/GradeUpdate.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  deleteGrade(data: any) {
    return this.http.post<any>(`${environment.baseUrl + 'Sheet/Admin/GradeDelete.php'}`, data, { 'headers': this.headers }).toPromise();
  }

  DSR_Report(data: any) {
    return new Promise((resolve, reject) => {
      this.animation_loader.LoadingAnimation();
      this.http.post<any>(`${environment.baseUrl + 'Sheet/DSR_Report/dsr_report.php'}`, data, { 'headers': this.headers }).subscribe((res) => {
        if (res != null && res != undefined) {
          resolve(res);
          var DATA = res['ORIGNAL_DATA'];
          var KeyList = Object.keys(DATA);
          KeyList.sort();
          var KEY_LIST = Object.keys(DATA[KeyList[0]]);
          var DEPOT_OBJECT = KeyList;
          var DATE_OBJECT = KEY_LIST;
          DATE_OBJECT.sort();
          var FOOTER_SUM: any = [];
          var TOTAL_SUM = 0;

          DATE_OBJECT.forEach(date_element => {
            var sum: number = 0;
            DEPOT_OBJECT.forEach(depot_element => {
              sum += parseFloat(DATA[depot_element][date_element]['SUM']);
            });
            FOOTER_SUM.push(sum);
          });
          for (let index = 0; index < KEY_LIST.length; index++) {
            var SUM: any = 0;
            for (let j = 0; j < KeyList.length; j++) {
              var d = DATA[KeyList[j]];
              SUM += parseFloat(d[KEY_LIST[index]]['SUM']);
            }
            TOTAL_SUM += parseFloat(SUM);
          }
          this.DSR_REPORT_DATA = {
            Data: DATA,
            KeyList: KeyList,
            DATE_LIST: KEY_LIST,
            FOOTER_SUM: FOOTER_SUM,
            TOTAL_SUM: res['TOTAL_SUM'],
            DATE_LENGTH: KEY_LIST.length,
            TOTAL_SUM_2: TOTAL_SUM,
            ORIGNAL_DATA: res['ORIGNAL_DATA'],
            updateddate: res['updateddate']
          };
          this.animation_loader.removeAnimation();
        } else {
          reject({})
          this.DSR_REPORT_DATA = [];
          this.animation_loader.removeAnimation();
        }
      }, err => {
        reject(err)
        this.notifyService.showError(err['message'], err['statusText']);
        this.animation_loader.removeAnimation();
      });
    })

  }

  InwardOutwardDiff(data: any) {
    return new Promise((resolve, reject) => {
      this.animation_loader.LoadingAnimation();
      this.http.post<any>(`${environment.baseUrl + 'Sheet/NewStockSheet/newstockdiff.php'}`, data, { 'headers': this.headers }).subscribe((res) => {
        resolve(res);
        this.INWARD_OUTWARD_DIFF = res?.data[0];
        console.log(res, "InwardOutwardDiff");
        this.animation_loader.removeAnimation();
      }, err => {
        reject(err)
        this.notifyService.showError(err['message'], err['statusText']);
        this.animation_loader.removeAnimation();
      });
    })
  }

  mergeByProperty(target: any[], source: any[], prop: string | number) {
    source.forEach((sourceElement: { [x: string]: any; }) => {
      let targetElement = target.find((targetElement: { [x: string]: any; }) => {
        return sourceElement[prop] === targetElement[prop];
      })
      targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
    })
  }

  DSR_Report_2(data: any) {
    this.animation_loader.LoadingAnimation();
    this.http.post<any>(`${environment.baseUrl + 'Sheet/DSR_Report/drs_report_2.php'}`, data, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
      if (res != null && res != undefined) {
        console.log(res);
        var DATA = res['data'];
        let sorted = Object.fromEntries(
          Object.entries(DATA).sort((a: any, b: any) => a[1] - b[1])
        )
        var KeyList = Object.keys(sorted);
        this.DSR_REPORT_DATA_2 = {
          Data: sorted,
          KeyList: KeyList
        };

        console.log(this.DSR_REPORT_DATA_2, sorted);
        this.animation_loader.removeAnimation();
      } else {
        this.DSR_REPORT_DATA_2 = [];
        this.animation_loader.removeAnimation();
      }
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
      this.animation_loader.removeAnimation();
    });
  }

  sortAssocObject(list: any) {
    let sortable = [];
    for (let key in list) {
      sortable.push([key, list[key]]);
    }
    sortable.sort(function (a, b) {
      return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
    });
    let orderedList: any = {};
    for (let idx in sortable) {
      orderedList[sortable[idx][0]] = sortable[idx][1];
    }
    return orderedList;
  }

  DSR_Report_3(data: any) {
    this.animation_loader.LoadingAnimation();
    this.http.post<any>(`${environment.baseUrl + 'Sheet/DSR_Report/dsr_report_3.php'}`, data, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
      if (res != null && res != undefined) {
        this.DSR_REPORT_DATA_3 = res['STORE_DATA'];
        this.animation_loader.removeAnimation();
      } else {
        this.DSR_REPORT_DATA_3 = [];
        this.animation_loader.removeAnimation();
      }
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
      this.animation_loader.removeAnimation();
    });
  }

  Labour_Report(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Sheet/Labour_Report/Labour_report.php'}`, data, { 'headers': this.headers }).pipe(delay(2000)).subscribe((res) => {
        if (res != null && res != undefined) {
          if (res['Status'] == true) {
            resolve(res);
            this.LABOUR_DATA = res;
          } else {
            resolve([]);
            this.LABOUR_DATA = [];
          }
          this.animation_loader.removeAnimation();
        } else {
          this.animation_loader.removeAnimation();
          resolve([]);
          this.LABOUR_DATA = [];
        }
      }, err => {
        resolve([]);
        this.LABOUR_DATA = [];
        this.notifyService.showError(err['message'], err['statusText']);
        this.animation_loader.removeAnimation();
      });
    });
  }

  getCountryList() {
    return new Promise((resolve, reject) => {
      this.http.get("assets/STATE_COUNTRY_CITY_JSON/countries.json").subscribe(data => {
        console.log(data);
        resolve(data);
      });
    });
  }

  getStateList() {
    return new Promise((resolve, reject) => {
      this.http.get("assets/STATE_COUNTRY_CITY_JSON/states.json").subscribe(data => {
        console.log(data);
        resolve(data);
      });
    });
  }

  getPincodeList() {
    return new Promise((resolve, reject) => {
      this.http.get("assets/STATE_COUNTRY_CITY_JSON/pincode.json").subscribe(data => {
        console.log(data);
        resolve(data);
      });
    });
  }

  getCityList() {
    return new Promise((resolve, reject) => {
      this.http.get("assets/STATE_COUNTRY_CITY_JSON/cities.json").subscribe(data => {
        console.log(data);
        resolve(data);
      });
    });
  }

  getTonBag() {
    var GRADE_LIST: any = [];
    GRADE_LIST['Ton value is : 20'] = 'Ton';
    GRADE_LIST['Bag value is : 1'] = 'Bag';
    return GRADE_LIST.sort();
  }

  _getAttendancelogin() {
    const JSON_PARSE_DATA = JSON.parse(this.cookieService.getCookie('AttendanceSheet'));
    return JSON_PARSE_DATA;
  }

  getCorrectionList() {
    return {
      "OUTWARD": [
        "DEALER NAME CORRECTION",
        "DEALER CODE CORRECTION",
        "INVOICE NUMBER CORRECTION",
        "QUANTITY CORRECTION",
        "GRADE CORRECTION",
        "TRUCK ARRANGED BY NAME CORRECTION",
        "VEHICLE NUMBER CORRECTION",
        "DOUBLE ENTRY",
        "MISSING  ENTRY",
        "WRONG ENTRY",
        "SALES RETURN",
        "SERVER ISSUE",
        "OTHERS"
      ],
      "INWARD": [
        "SOURCE PLANT NAME CORRECTION",
        "INVOICE NUMBER CORRECTION",
        "INVOICE DATE CORRECTION",
        "ARRIVAL DATE CORRECTION",
        "QUANTITY CORRECTION",
        "GRADE CORRECTION",
        "TRANSPORTER NAME CORRECTION",
        "VEHICLE NUMBER CORRECTION",
        "DOUBLE ENTRY",
        "WRONG ENTRY",
        "MISSING  ENTRY",
        "SERVER ISSUE",
        "OTHERS"
      ]
    };
  }
  getDealerReport(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((reslove, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Depot_Data/Dealer_Report.php'}`,
        data, { 'headers': this.headers }).subscribe((res) => {
          reslove(res);
          this.animation_loader.removeAnimation();
        }, err => {
          reject([]);
          this.notifyService.showError(err['message'], err['statusText']);
          this.animation_loader.removeAnimation();
        });
    });
  }
  getDealerCode(data: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((reslove, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Depot_Data/Dealer_Code.php'}`,
        data, { 'headers': this.headers }).subscribe((res) => {
          reslove(res);
          this.animation_loader.removeAnimation();
        }, err => {
          reject([]);
          this.notifyService.showError(err['message'], err['statusText']);
          this.animation_loader.removeAnimation();
        });
    });
  }
  toDateFormat(format: any) {
    var normalized = format.replace(/[^a-zA-Z0-9]/g, '-');
    var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    var formatItems = normalizedFormat.split('-');
    var dateItems = normalized.split('-');

    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var hourIndex = formatItems.indexOf("hh");
    var minutesIndex = formatItems.indexOf("ii");
    var secondsIndex = formatItems.indexOf("ss");

    var today = new Date();

    var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
    var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
    var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

    var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
    var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
    var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year, month, day, hour, minute, second);
  };
  getDateFormat(date: any) {
    var datefor: any = ''
    var dateformat: any = ''
    if (date.indexOf('/') != -1) {
      datefor = date.split('/');
      datefor = datefor?.reverse().join('-')
    }
    if (date.indexOf('-') != -1) {
      datefor = date
    }
    console.log(datefor, 'dfdsfdsfdsfd')

    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!regex_date.test(datefor)) {
      datefor = this.formatDate(datefor);
      console.log(datefor, 'dsfsdfdsfdf')
    }
    return moment(datefor).format('YYYY-MM-DD');
  }
  DateFormat(d: any) {
    var date = new Date(d);
    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }
  formatDate(date: any) {
    var d = date.split('-'),
      month = '' + (d[1]),
      day = '' + d[2],
      year = d[0];
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (year.length < 4) {
      let indexloop: any = this.getYearLoop().filter((item: any) => item.indexOf(year) != -1)
      year = indexloop[0]
    }
    return [year, d[1] < 12 ? month : day, d[1] > 12 ? month : day].join('-');
  }

  getYearLoop() {
    var loopyear: any = [];
    for (let index = 1; index < 50; index++) {
      loopyear.push((2000 + index).toString())
    }
    return loopyear;
  }


  // Mail Sender api...
  getOuwardMailSenderdata(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutWardget.php'}`, DATA).subscribe((res) => {
          if (res['response']['status']) {
            console.log(res)
            resolve(res);
          } else {
            resolve(null);
            this.animation_loader.ToolTips_AnimationStart(5, { Inward_Table: res['response']['message'] }, null);
          }
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }

  postMailSender(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'mailsend/mailsender.php'}`, DATA).subscribe((res) => {
        resolve(res);
        this.animation_loader.removeAnimation();
      }, error => {
        resolve(error);
        this.animation_loader.removeAnimation();
      });
    });
  }

  getDealerMailId(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.baseUrl + 'Depot_Data/getDealerDetails.php'}`, DATA).subscribe((res) => {
        resolve(res);
        this.animation_loader.removeAnimation();
      }, error => {
        resolve(error);
        this.animation_loader.removeAnimation();
      });
    });
  }

  updateMailSender(DATA: any) {
    this.animation_loader.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/OutwardUpdatebyId.php'}`, DATA).subscribe((res) => {
          resolve(res);
          this.animation_loader.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.animation_loader.removeAnimation();
        });
      } else {
        resolve(null);
        this.animation_loader.removeAnimation();
      }
    });
  }


  updateGrades(materials: any[], gradeList: { Id: string; Grade_Name: any; material_no: any; material_description: any; }[]) {
    materials.forEach((material: { grade: any; code: any; description: any; }) => {
      const gradeIndex = gradeList.findIndex((grade: { Grade_Name: any; }) => grade.Grade_Name === material.grade);
      if (gradeIndex !== -1) {
        gradeList[gradeIndex].material_no = material.code;
        gradeList[gradeIndex].material_description = material.description;
      } else {
        gradeList.push({
          Id: `NEW_${gradeList.length + 1}`,
          Grade_Name: material.grade,
          material_no: material.code,
          material_description: material.description
        });
      }
    });
    return this.splitAndPushMaterialNumbers(gradeList);
  }

  splitAndPushMaterialNumbers(grades: any[]) {
    const originalLength = grades.length;
    for (let i = 0; i < originalLength; i++) {
      const grade = grades[i];
      if (grade.material_no.includes(',')) {
        const materialNos = grade.material_no.split(',').map((item: string) => item.trim());
        grade.material_no = materialNos[0];
        for (let j = 1; j < materialNos.length; j++) {
          grades.push({
            Id: grade.Id,
            Grade_Name: grade.Grade_Name,
            material_no: materialNos[j],
            material_description: grade.material_description
          });
        }
      }
    }
    return grades;
  }

}
