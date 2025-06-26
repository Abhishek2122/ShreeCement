import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from '../../../core/services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularModalPopup, ModalService } from 'modal-popup-angular-18';
import moment from 'moment';
import { HttpEventType } from '@angular/common/http';
import { NotificationService } from '../../../core/services/notification.service';


@Component({
  selector: 'app-outward-upload',
  templateUrl: './outward-upload.component.html',
  styleUrl: './outward-upload.component.scss'
})
export class OutwardUploadComponent implements OnInit {
  Tabelheader: string[] = [
    "SR.NO.",
    "ENTRY_DATE",
    "SOURCEPLANT",
    "PLANTINVOICENO",
    "INVOICE_DATE",
    "ARR.DT.TRUCK",
    "INVOICEQTY",
    "GRADE",
    "GOODSTOCK",
    "CUT&TORN",
    "SHORTAGE",
    "UNLOADING",
    "TRANSHIPMENT",
    "DIVERSION",
    "TRANSPORTC0MPANY",
    "VEHICLENO.",
    "REASON DELAY",
    "INTIME",
    "OUTTIME",
    "HALTTIME",
    "DEPOT CODE",
    "EMP ID",
    "COMMENTS"
  ];
  listOfData: any[] = [];
  date = null;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  loading = false;
  filteredDepots: any = [];
  depots: any = [];
  filterForm: FormGroup = new FormGroup({
    depotDetails: new FormControl({}, []),
  });
  BAGTONData = ['Ton', 'Bag'];
  TableData: any = [];
  PAGE_LIMIT: number = 10;
  PAGE_INDEX: number = 1;
  totalRecords: number = 0;
  isLoadingOne = false;
  PLANT_CODE: any = { '1303': 'KADAPA', '1301': 'DALMIAPURAM', '1302': 'ARILUR', '1300': 'BELGULUM/YADWAD' }
  MATERIAL_NO: Array<{ grade: string; code: string, description: string }> = [];
  MATERIAL_NO_DUMP: Array<{ grade: string; code: string, description: string }> = [];
  GradeNotFound: any = [];
  STATIC_UNIQUE_ID: any = this.uniqueID() + '_' + (new Date().getTime());
  GRADE_LIST_OBJECT: any = [];
  SESSION_DATA: any = [];
  IN_VALID_DATE: boolean = false;
  STORAGE_LOCATION: any = ['LT01', 'DM01', 'CT01', 'TL01', 'OCFG'];

  constructor(
    public service: MainService,
    private notifyService: NotificationService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.service.getGradeList().then((res) => {
      for (let index = 0; index < this.service.GRADE_LIST.length; index++) {
        this.GRADE_LIST_OBJECT.push(this.service.GRADE_LIST[index]);
      }
    });
    this.service.getSessionLogin().subscribe((res: any) => {
      this.SESSION_DATA = { ...res, ...res?.data }
    })
    this.service.getGradeListData().then((res: any) => {
      const updatedGrades = this.service.updateGrades(this.MATERIAL_NO_DUMP, res);
      this.MATERIAL_NO = updatedGrades;
    })
    this.service.ALLDepotCode().then((res: any) => {
      this.depots = res?.data?.map((items: any) => {
        return {
          label: items['depot_name'] + ' | ' + items['depot_code'],
          value: items['depot_code'],
          ...items
        }
      })
      this.filteredDepots = this.depots
    });
  }

  @ViewChild("UploadUIOpen") UploadUIOpen: any;
  UploadUIOpen_Close?: AngularModalPopup;
  loadData(): void {
    this.UploadUIOpen_Close = this.modalService.open(this.UploadUIOpen, {
      title: "",
      headerhide: true,
      bghide: true
    })
  }

  uploadCompleted(event: any) {
    console.log(event, "asdasdasdasd")
    this.IN_VALID_DATE = false;
    this.UploadUIOpen_Close?.close(this.UploadUIOpen_Close?.RAMDOM_ID ?? 0);
    this.FILE_DETAILS = event?.uploadQueue[0]?.file
    this.TableData = event?.uploadQueue[0]?.data?.result?.map((items: any) => {
      const plant_code: any = this.PLANT_CODE[(items['Plant'])];
      let grade = items['MATERIAL DESCRIPTION'] != undefined ? items['MATERIAL DESCRIPTION'] : items['Material Desc.'];
      let GRADE_NAME: any = this.gradeIndexOf(grade);
      let GradeName: any = ''
      const FILTER_MATERIAL_DATA: any = this.MATERIAL_NO.filter((item: any) => item?.material_no === (items['Material No'] || items['MATERIAL NUMBER']))
      if (FILTER_MATERIAL_DATA?.length != 0) {
        GradeName = (FILTER_MATERIAL_DATA[0]?.Grade_Name)
      } else if (GRADE_NAME != undefined && GRADE_NAME != null && GRADE_NAME != '') {
        GradeName = (GRADE_NAME)
      } else {
        GradeName = ("Not Grade found")
        this.GradeNotFound.push(`Error: Grade "${items['Material No']} | ${items['Material Desc.']}" not found in the existing list.`)
      }
      const UNLOADING = items['SHIPING DESC'] == 'LOADING' ? items['ACTUAL INVOICED QUANTITY'] : 0;
      const Transphipment = items['SHIPING DESC'] == 'Transshipment' ? items['ACTUAL INVOICED QUANTITY'] : 0;
      const Diversion = items['SHIPING DESC'] == 'Diversion' ? items['ACTUAL INVOICED QUANTITY'] : 0;
      let deleteflag = 0;
      let comments = "NA"
      if (this.STORAGE_LOCATION.includes(items['STORAGE LOCATION'])) {
        deleteflag = 1;
        comments = (items['STORAGE LOCATION']);
      } else if (items['SHIPING DESC'] == 'Diversion' && (items['DCHNL NAME']).toLocaleLowerCase() == ('stock transfer').toString().toLocaleLowerCase()) {
        deleteflag = 1;
      } else {
        deleteflag = 0;
      }
      const haltHour: any = 'NA'
      const storeDate = this.service.getMonthYear2(items['BILL CREATION DT']);
      const session = this.SESSION_DATA;
      items['TimeStamp'] = new Date();
      items['DepotCode'] = (items['PLANT'])
      items['EmpId'] = session['Emp_Id']
      items['EntryDate'] = ((items['BILL CREATION DT']))
      items['InvoiceDate'] = ((items['BILL CREATION DT']))
      items['Frieght_Status'] = 'Pending'
      return {
        Entry_Date: items['BILL CREATION DT'],
        SourcePlant: plant_code,
        InvoiceNumber: items['BILLING DOCUMENT'],
        InvoiceDate: items['BILL CREATION DT'],
        Dealer_Name: items['SOLD-TO NAME'],
        Dealer_Code: items['SOLD-TO PARTY'],
        ArrivalDateOfTruck: items['Arrival date'],
        TruckArrangedBy: items['TRANSPORTER NAME'],
        InvoiceQty: (parseFloat(items['ACTUAL INVOICED QUANTITY']) * 20).toFixed(2),
        Grade: GradeName,
        Unloading: UNLOADING,
        Transphipment: Transphipment,
        Diversion: Diversion,
        TransporterCompany: items['Transporter Name'],
        VehicleNumber: items['LORRY / TRUCK NO.'],
        InvoiceValue: items['INVOICE VALUE'],
        EwayDate: items['E-WAY DATE'] != '' ? items['E-WAY DATE'] : 'NF',
        EwayNo: items['E-WAY BILL NO'] != '' ? items['E-WAY BILL NO'] : 'NF',
        depot_code: items['PLANT'],
        emp_id: this.SESSION_DATA['Emp_Id'],
        DriverName: items['DRIVER NAME'],
        DriverMobileNumber: items['MOBILE NO.'],
        reasonForDelay: "NA",
        Depot_Code: items['PLANT'],
        BillingTimeOfPlant: ((items['Invoice Date'])),
        InTimeOfTruck: ((items['SO TIME'])),
        OutTimeOfTruck: ((items['BILLING TIME'])),
        ClearDateOfTruck: "NA",
        Month: storeDate.Month,
        Year: storeDate.Year,
        Emp_Id: session['Emp_Id'],
        HaltHour: haltHour,
        comments: comments,
        Today: storeDate.DayOfWeek,
        fileId: this.STATIC_UNIQUE_ID + '_' + session['Emp_Id'],
        STO_LOCATION: items['STO_LOCATION'],
        deleteflag: deleteflag,
        OUTWARD_TRANSPORTER: items
      }
    });
    this.IN_VALID_DATE = this.CHECK_IF_OLD_DATA_EXISTS();
  }

  ChangeTableDataDepotCode(event: any) {
    this.TableData.forEach((element: any) => {
      element['depot_code'] = event?.depot_code
      element['Depot_Code'] = event?.depot_code
    });
  }

  index: number = 0;
  response_msg: any = ''
  START_INDEX: number = 0;
  CLEAR_INTERVAL: any = null;
  batchSizes = [100, 200, 300, 400];
  selectedBatchSize = 100; // default value
  BATCH_LIMIT: number = 100;
  END_INDEX: number = this.BATCH_LIMIT;
  FILE_DETAILS: any = [];
  progress: number = 0
  uploadStart(progressbtn: any) {
    const FILE_Id = this.STATIC_UNIQUE_ID + '_' + this.SESSION_DATA['Emp_Id']
    this.service.FileUpload({
      id: FILE_Id,
      'Name': this.FILE_DETAILS?.name,
      Time: moment(new Date()).format("YYYY-MM-DD hh:mm A"),
      Size: this.FILE_DETAILS?.size,
      TableName: 'Outward',
      EmpId: this.SESSION_DATA['Emp_Id'],
      DepotCode: this.SESSION_DATA['depot_code'],
      Date: moment(new Date()).format("YYYY-MM-DD")
    }).subscribe((fileres) => {
      this.UPLOAD_FILE_EXCEL(progressbtn, FILE_Id)
    });
  }

  UPLOAD_FILE_EXCEL(progressbtn: any, fileId: string) {
    // ✅ Guard clause for empty or undefined TableData
    if (!this.TableData || this.TableData.length === 0 || this.START_INDEX >= this.TableData.length) {
      console.warn('No data to upload.');
      return;
    }
    clearInterval(this.CLEAR_INTERVAL);
    const batchdata = this.TableData.slice(this.START_INDEX, this.END_INDEX);
    if (batchdata.length === 0) {
      console.warn('No batch data to process.');
      return;
    }

    const totalLength = this.TableData.length;
    const currentBatchLength = batchdata.length;

    this.service.OutwardUploadNew(batchdata).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          if (event.total) {
            const chunkProgress = Math.round((event.loaded / event.total) * 100);
            const uploadedRecords = this.START_INDEX + (chunkProgress / 100) * currentBatchLength;
            this.progress = Math.round((uploadedRecords / totalLength) * 100);
          }
          break;
        case HttpEventType.Response:
          if (this.END_INDEX > this.TableData.length) {
            this.progress = 100;
            this.notifyService.showSuccess(event.body['response']['message'], "Success Insert Data");
            break;
          } else {
            this.START_INDEX = this.END_INDEX;
            this.END_INDEX += this.BATCH_LIMIT;
            if (this.END_INDEX >= this.TableData.length) {
              this.END_INDEX = this.TableData.length;
            }
            this.UPLOAD_FILE_EXCEL(progressbtn, fileId);
          }
      }
    });
  }

  onChangeEvent(event: any) {
    this.PAGE_INDEX = event?.pageIndex + 1;
    this.loadData();
  }

  gradeIndexOf(gradename: any) {
    for (let index = 0; index < this.GRADE_LIST_OBJECT.length; index++) {
      if (gradename.replace(' ', '').includes(this.GRADE_LIST_OBJECT[index])) {
        return this.GRADE_LIST_OBJECT[index];
      }
    }
  }

  uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }

  setOneExtraDate(date: any) {
    let date_extra: any = new Date(date);
    date_extra.setDate(date_extra.getDate() + 1);
    return date_extra
  }

  CHECK_IF_OLD_DATA_EXISTS(): boolean {
    if (!this.TableData || this.TableData.length === 0) return false;

    const now = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(now.getDate() - 5);

    return this.TableData.some((item: any) => {
      const entryDate = new Date(item.entry_date);
      return entryDate < fiveDaysAgo;
    });
  }
}