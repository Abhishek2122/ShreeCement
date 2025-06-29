import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../core/services/service.service';

@Component({
  selector: 'depot-details-panel',
  templateUrl: './depot-details-panel.component.html',
  styleUrl: './depot-details-panel.component.scss'
})
export class DepotDetailsPanelComponent implements OnInit {
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

  constructor(public service: MainService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  isLoadingOne = false;
  loadData(): void {
    this.isLoadingOne = true;
    this.service.getDepotData({
      limit: this.PAGE_LIMIT,
      page: this.PAGE_INDEX
    }).subscribe(async (res: any) => {
      this.isLoadingOne = false;
      this.TableData = res?.data;
      this.totalRecords = res?.totalCount
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


