import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadRoutingModule } from './upload-routing.module';
import { InwardUploadComponent } from './inward-upload/inward-upload.component';
import { OutwardUploadComponent } from './outward-upload/outward-upload.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InwardUploadComponent,
    OutwardUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UploadRoutingModule,
  ]
})
export class UploadModule { }
