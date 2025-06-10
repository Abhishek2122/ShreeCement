import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {

  TEMPLATE_TOST_CLASS = `
      <div class="main-page" id="custom-popup">
      <div class="responsive-page">
      <div class="header-page">
        <h5 class="title-page">Custom Model</h5>
        <button class="btn btn-secondary close-btn" id="CLOSEBTN">Close</button>
      </div>
      <div class="middle-page"></div>
      </div>
      </div>
  `;

  TEMPLATE_TOST_CLASS_CSS = `
  .main-page{
    display:none;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000029;
    align-items: center;
    justify-content: center;
    z-index: 9999999999;
  }

  .responsive-page{
    display: flex;
    flex-direction: column;
    min-width: 300px;
    min-height: 150px;
    max-width: 60%;
    max-height: 50%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0px 0px 8px 0px #00000091;
    margin: auto;
    transition: all .5s ease-in-out;
  }

  .header-page{
    display: flex;
    gap: 30px;
    width: 100%;
    max-height: 100%;
    min-height: 35px;
    align-items: center;
    background-color: #085b85;
    padding: 0;
    justify-content: center;
    color: white;
    padding: 5px;
    padding-left: 20px;
  }

  .close-btn{
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: auto;
    margin-right: 10px;
    font-size: 20px;
    background-color: transparent;
    border: none;
    color: white;
    font-weight: 700;
  }

  .title-page{
    font-size: 20px;
  }
  .middle-page{
    overflow-wrap: anywhere;
    width: 100%;
    height: 100%;
    padding: 30px;
    margin: auto;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }
  .footer-page{
    border-top: 2px solid #989696;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px;
    color: darkred;
  }
  .footer-page h2{
    font-size: 13px;
  }
  .Success-cls{
    background-color: #226b22;
    color: white;
  }
  .color-white{
    color:white;
  }

  .Error-cls{
    background-color:#860202;
    color: white;
  }
  `;

  constructor () {
    $('body').append(this.TEMPLATE_TOST_CLASS);
    $(`<style class="style-remove">${this.TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
    $("#custom-popup").hide();
    this.removeAllClass();
  }

  showSuccess(message: any, title: any) {
    $("#CLOSEBTN").click(()=> {
      $("#custom-popup").hide();
    });
    this.removeAllClass();
    $("#custom-popup").show().css({'display':'flex'});
    $(`.title-page`).html(title);
    $(`.middle-page`).html(message);
    // this.HideTimer();
  }
  showSuccessCallBack(message: any, title: any,callback:any) {
    $("#CLOSEBTN").click(()=> {
      $("#custom-popup").hide();
    });
    this.removeAllClass();
    $("#custom-popup").show().css({'display':'flex'});
    $(`.title-page`).html(title);
    $(`.middle-page`).html(message);
    this.HideTimer();
    if (callback != undefined && callback != null) {
      setTimeout(() => {
        this.removeAllClass();
        $("#custom-popup").hide();
        callback();
      }, 2000);
    }
  }

  showError(message: any, title: any) {
    $("#CLOSEBTN").click(()=> {
      $("#custom-popup").hide();
    });
    this.removeAllClass();
    $("#custom-popup").show().css({'display':'flex'});
    $(`.title-page`).html(title);
    $(`.middle-page`).html(message);
    this.HideTimer();
  }

  showInfo(message: any, title: any) {
    $("#CLOSEBTN").click(()=> {
      $("#custom-popup").hide();
    });
    $("#custom-popup").show().css({'display':'flex'});
  }

  showWarning(message: any, title: any) {
    $("#CLOSEBTN").click(()=> {
      $("#custom-popup").hide();
    });
    $("#custom-popup").show().css({'display':'flex'});
  }
  removeAllClass() {
    $("#custom-popup .responsive-page").removeClass('Success-cls');
    $("#custom-popup .responsive-page .footer-page").removeClass('color-white');
    $("#custom-popup .responsive-page").removeClass('Error-cls');
    $("#custom-popup .responsive-page .footer-page").removeClass('color-white');
  }

  HideTimer() {
    setTimeout(() => {
      this.removeAllClass();
      $("#custom-popup").hide();
    }, 10000);
  }
ngOnInit(): void {
}
}
