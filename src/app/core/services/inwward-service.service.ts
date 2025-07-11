import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InwwardServiceService {

    getTransporterCompanyName(): Array<string> {
        return [
            'Others', 'Balaji Logistics Company', 'Shivaani Transport', 'Shri Anandeshwari Homes Private Ltd',
            'Sri Guru Transport', 'Ramanjaneya Transport', 'Shiva Bhairava Transport', 'Nandi Warehousing Company',
            'Sri Siva Sakthi Sai Transport', 'Sai Ganesh Logistics', 'Sree Vani Transport', 'Sri Gurappa Swamy Logistics',
            'Padmavathi Transport', 'Spoorthi Logistics', 'Om Sai Transport', 'Shirnivas Transport', 'Shri Panduranga Logistcis',
            'Bharat Transport',
            'Shri Swami Samarth Transport', 'Neha Roadlines', 'Kgr Transport', 'M.S.R Transport', 'Sehc International Pvt Ltd',
            'Karthikeya Transport', 'Raja Transport', 'Khushi Transport', 'Durga Complex Pvt Ltd',
            'Rapidloops logistics Pvt Ltd', 'Pragathi Associates', 'Raajalingam Transport', 'M/s Sun logistics',
            'Trans express logistics', 'Shree mahalakshmi traders', 'Satguru carriers', 'Garuda logistics',
            'Sri guruppa swamy logistics', 'Sameer suppliers and transport', 'DM transport,Teja transport',
            'SGM lorry service', 'VRAJ cement carrier LLP', 'Sa  Dhandapani'
        ].sort();
    }


    getCorrectionList() {
        const LIST_JSON = {
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
        }
        return LIST_JSON;
    }
}
