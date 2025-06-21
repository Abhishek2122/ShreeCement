import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainService } from '../../../core/services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-outward-view-page',
  templateUrl: './outward-view-page.component.html',
  styleUrl: './outward-view-page.component.scss'
})
export class OutwardViewPageComponent {
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

  constructor(public service: MainService) {
    service.TITLE_OF_PAGE = "This is Inward Report sheet : Select Options to navigate"
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
    this.service.getOutwardTableData({
      "Start_Date": moment(this.filterForm.value.Start_End_Date[0]).format("YYYY-MM-DD"),
      "End_Date": moment(this.filterForm.value.Start_End_Date[1]).format("YYYY-MM-DD"),
      "Depot_Name": this.filterForm.value.depotDetails?.depot_name,
      "Bag_Ton": "Ton",
      "Depot_Code": this.filterForm.value.depotDetails?.depot_code
    }).then(async (res: any) => {
      console.log(res,"asdasdasdsad")
      this.isLoadingOne = false;
      this.TableData = res;
    })
  }
}
