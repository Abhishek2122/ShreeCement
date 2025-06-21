import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InwardUploadComponent } from './inward-upload/inward-upload.component';
import { OutwardUploadComponent } from './outward-upload/outward-upload.component';

const routes: Routes = [
    {
        path: "Inward", component: InwardUploadComponent, data: {
            title: "This is File Upload Inward Sheet"
        }
    },
    {
        path: "Outward", component: OutwardUploadComponent, data: {
            title: "This is File Upload Outward Sheet"
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class UploadRoutingModule { }
