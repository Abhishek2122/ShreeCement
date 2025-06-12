import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  constructor(public toastr_service: ToastrService) {}

  showSuccess(message: any, title: any) {
    this.toastr_service.show(message, title)
  }

  showSuccessCallBack(message: any, title: any, callback: any) {
    this.toastr_service.show(message, title).onHidden.subscribe((res) => callback({ message, title }))
  }

  showError(message: any, title: any) {
    this.toastr_service.error(message, title)
  }

  showInfo(message: any, title: any) {
    this.toastr_service.info(message, title)
  }

  showWarning(message: any, title: any) {
    this.toastr_service.warning(message, title)
  }

  ngOnInit(): void {
  }
}
