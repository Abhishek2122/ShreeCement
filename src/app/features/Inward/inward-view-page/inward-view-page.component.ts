import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainService } from '../../../core/services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { JsonToExcelService } from '../../../core/services/json-to-excel.service';

@Component({
  selector: 'app-inward-view-page',
  templateUrl: './inward-view-page.component.html',
  styleUrl: './inward-view-page.component.scss'
})
export class InwardViewPageComponent implements OnInit {
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
  TableData: any = [];
  PAGE_LIMIT: number = 10;
  PAGE_INDEX: number = 1;
  totalRecords: number = 0;

  constructor(public service: MainService, private jsontoexcel: JsonToExcelService) { }

  ngOnInit(): void {
    console.log(this.service.TITLE_OF_PAGE, "this.mainSerivce.TITLE_OF_PAGE")
    this.service.ALLDepotCode().subscribe((res: any) => {
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
    this.service.getInwardTableData({
      "Start_Date": moment(this.filterForm.value.Start_End_Date[0]).format("YYYY-MM-DD"),
      "End_Date": moment(this.filterForm.value.Start_End_Date[1]).format("YYYY-MM-DD"),
      "Depot_Name": this.filterForm.value.depotDetails?.depot_name,
      "Bag_Ton": "Ton",
      "Depot_Code": this.filterForm.value.depotDetails?.depot_code,
      limit: this.PAGE_LIMIT,
      page: this.PAGE_INDEX
    }).then(async (res: any) => {
      this.isLoadingOne = false;
      this.TableData = res?.data;
      this.totalRecords = res?.totalCount
    })
  }

  onChangeEvent(event: any) {
    this.PAGE_INDEX = event?.pageIndex + 1;
    this.loadData();
  }

  downloadCSV() {
    this.service.getInwardTableData({
      "Start_Date": moment(this.filterForm.value.Start_End_Date[0]).format("YYYY-MM-DD"),
      "End_Date": moment(this.filterForm.value.Start_End_Date[1]).format("YYYY-MM-DD"),
      "Depot_Name": this.filterForm.value.depotDetails?.depot_name,
      "Bag_Ton": "Ton",
      "Depot_Code": this.filterForm.value.depotDetails?.depot_code,
      limit: this.totalRecords,
      page: this.PAGE_INDEX
    }).then(async (res: any) => {
      console.log(res, "asdasdasdsad")
      this.isLoadingOne = false;
      const data: any = res?.data
      this.jsontoexcel.exportJsonToExcel(data, "InwardSheet")
    })
  }
}
