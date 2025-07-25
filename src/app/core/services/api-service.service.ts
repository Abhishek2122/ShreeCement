import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    dataTable: any = [];
    dataConveter: any = [];
    username: string = '';
    PopupShow: boolean = false;
    content: string = '';
    title: string = '';
    searchValue: string = "";
    CompomentView: any;
    EditTable_Id: any;
    index: any;
    DATA: any;
    year: string = new Date().getFullYear() + '';
    YearList: Array<String> = new Array();
    monthNames = ["Select Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month: string = this.monthNames[new Date().getMonth() + 1];
    SUB_TITLE_DATA: Array<string> = new Array();
    isStartingAmount: boolean = false;

    constructor() {
    }
    
    ContentShow(content: string) {
        this.content = content;
    }
    ComponentView(View: any) {
        this.CompomentView = View;
    }
    PopupTitle(content: string) {
        this.title = content;
    }
    setIndex(i: any) {
        this.index = i;
    }
    setExpenseData(data: any) {
        this.DATA = data;
    }
    setMonth(m: any) {
        this.month = m.value;
    }
    setYear(y: any) {
        this.year = y.value;
    }
    getYear() {
        return this.year;
    }
    getMonth() {
        return this.month;
    }
    getMonthList() {
        return this.monthNames;
    }
    getYearList() {
        this.YearList.push('Select Year');
        for (let index = 2015; index < 2045; index++) {
            this.YearList.push(index.toString());
        }
        return this.YearList;
    }
    TableLoadData(month: string, year: string) {
        this.dataConveter = [];
    }
    getExpenseTableData() {
        return this.dataConveter;
    }
    getExpenseSubTitleData() {
        return this.SUB_TITLE_DATA;
    }

    getMonthYear(Month: any, Year: any, date: any = new Date()) {
        var currentobj = new Date();
        var CURRENT_DATE = currentobj.getDate();
        var CURRENT_MONTH = currentobj.getMonth() + 1;
        var CURRENT_YEAR = currentobj.getUTCFullYear();

        var dynamicdate = new Date();
        dynamicdate.setMonth(parseInt(Month) - 1);
        dynamicdate.setFullYear(parseInt(Year));
        console.log(Month, Year, dynamicdate, 'dhfgdfjhfgdfd');

        var month = dynamicdate.getMonth();
        var day = new Date(date).toLocaleDateString('default', { weekday: 'long' });
        var year = dynamicdate.getUTCFullYear();
        return {
            Month: Month,
            Year: Year,
            Day: day,
            CURRENT_DATE: CURRENT_DATE,
            LastDay: CURRENT_MONTH == (month) ? CURRENT_DATE : this.getDaysInMonth(Month, Year),
            CURRENT_MONTH: CURRENT_MONTH,
            CURRENT_YEAR: CURRENT_YEAR
        }
    }
    getDaysInMonth(m: any, y: any) {
        return m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
    }
}
