import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'mat-table-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  public pages: number[] = [];
  @Input("activePage") activePage: number=0;
  @Input("ExtraPanel") ExtraPanel: boolean = false;

  PAGE_INFO: any = {
    length: this.totalRecords,
    pageIndex: 0,
    pageSize: this.recordsPerPage,
    previousPageIndex: 0
  }

  ngOnChanges(): any {
    this.PAGE_INFO = {
      length: this.totalRecords,
      pageIndex: this.activePage - 1,
      pageSize: this.recordsPerPage,
      recordsPerPage: this.recordsPerPage,
      previousPageIndex: 0
    }
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
  }

  private getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: any = [];
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      if (this.activePage == this.pages.length) {
        this.PAGE_INFO = {
          length: this.totalRecords,
          pageIndex: pageNumber - 1,
          pageSize: this.totalRecords,
          previousPageIndex: pageNumber - 2,
          recordsPerPage: this.recordsPerPage,
        }
        this.onPageChange.emit(this.PAGE_INFO);
      } else {
        this.PAGE_INFO = {
          length: this.totalRecords,
          pageIndex: pageNumber - 1,
          pageSize: this.recordsPerPage * this.activePage,
          previousPageIndex: pageNumber - 2,
          recordsPerPage: this.recordsPerPage,
        }
        this.onPageChange.emit(this.PAGE_INFO);
      }
    }
  }
}  
