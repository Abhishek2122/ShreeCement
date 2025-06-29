import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { MainService } from '../../../core/services/service.service';

@Component({
  selector: 'app-damage-report-inward-outward',
  templateUrl: './damage-report-inward-outward.component.html',
  styleUrl: './damage-report-inward-outward.component.scss'
})
export class DamageReportInwardOutwardComponent implements OnInit {
  listOfData: any[] = [];
  date = null;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  loading = false;
  filteredDepots: any = [];
  depots: any = [];
  filterForm: FormGroup = new FormGroup({
    Start_End_Date: new FormControl('', [Validators.required]),
    depotDetails: new FormControl({}, [Validators.required]),
    BAGTON: new FormControl({}, [Validators.required]),
  });
  BAGTONData = ['Ton', 'Bag'];
  TableDataInward: any = [];
  TableDataOutward: any = [];
  PAGE_LIMIT: number = 10;
  PAGE_INDEX: number = 1;
  totalRecordsInward: number = 0;
  totalRecordsOutawrd: number = 0;

  constructor(public service: MainService) {
    service.TITLE_OF_PAGE = "This is File Upload Sheet"
  }

  ngOnInit(): void {
    this.service.ALLDepotCode().then((res: any) => {
      console.log(res);
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


  isLoadingOne = false;
  loadData(): void {
    console.log(this.filterForm.value, "depotDetails")
    this.isLoadingOne = true;
    this.service.getDamgeReportData({
      "Start_Date": moment(this.filterForm.value.Start_End_Date[0]).format("YYYY-MM-DD"),
      "End_Date": moment(this.filterForm.value.Start_End_Date[1]).format("YYYY-MM-DD"),
      "Depot_Name": this.filterForm.value.depotDetails?.depot_name,
      "Depot_Code": this.filterForm.value.depotDetails?.depot_code,
      limit: this.PAGE_LIMIT,
      page: this.PAGE_INDEX
    }).subscribe(async (res: any) => {
      console.log(res, "getDamgeReportData")
      this.isLoadingOne = false;
      this.TableDataInward = res?.data?.InwarddataRows;
      this.TableDataOutward = res?.data?.OutwarddataRows;
      this.totalRecordsInward = res?.totalCount?.InwardcountRows
      this.totalRecordsOutawrd = res?.totalCount?.OuwardcountRows
    }, (err) => {
      this.isLoadingOne = false;
    })
  }

  onChangeEvent(event: any) {
    console.log(event, "onChangeEvent")
    this.PAGE_INDEX = event?.pageIndex + 1;
    this.loadData();
  }

}