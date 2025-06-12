import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mat-table-resuable',
  templateUrl: './mat-table-resuable.component.html',
  styleUrl: './mat-table-resuable.component.scss'
})
export class MatTableResuableComponent implements OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any = [];
  @Input() ActionRequired: boolean = false;
  @Input() totalRecords: number = 0;
  @Input() recordsPerPage: number = 0
  @Output() event: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,"sdsldkslj")
    if (changes['displayedColumns']) {
      if (this.ActionRequired == true) {
        this.displayedColumns = ['Action', 'SrNo.', ...changes['displayedColumns']['currentValue']]
      } else {
        this.displayedColumns = ['SrNo.', ...changes['displayedColumns']['currentValue']]
      }
    }
    if (changes['dataSource']) {
      this.dataSource = changes['dataSource']['currentValue']?.map((items: any, index: any) => {
        return {
          "SrNo.": (index + 1),
          ...items
        }
      })
    }
  }
}
