import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MainService } from '../../core/services/service.service';
import { CustomToolTipsService } from '../../core/services/custom-tool-tips.service';
import { ApiServiceService } from '../../core/services/api-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ModalService } from 'modal-popup-angular-18';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  SESSION_DATA: any = [];
  previousUrl: string = '';
  selected: any = {};
  AppVersion: string = "v1.0.0"
  menuList: any = [{
    name: "Inward Sheet",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "/home/Inward/View" },
      { label: "Add Entry", route: "/home/Inward/Add" }
    ]
  },
  {
    name: "Outward Sheet",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "/home/Outward/View" },
      { label: "Add Entry", route: "/home/Outward/Add" }
    ]
  },
  {
    name: "Stock Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "/home/StockReport" },
    ]
  },
  {
    name: "File Upload Details and Deletion",
    route: "FileUploadDeletionPanel",
    subMenu: [
      { label: "View Report", route: "FileUploadDeletionPanel" },
    ]
  },
  {
    name: "Upload : Inward | Outward",
    route: "menulink2",
    subMenu: [
      { label: "Inward Upload", route: "/home/Upload/Inward" },
      { label: "Outward Upload", route: "/home/Upload/Outward" }
    ]
  },
  {
    name: "Depot and Employees Details",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "/home/AdminController" },
      { label: "Add Entry", route: "submenulink2" }
    ]
  },
  {
    name: "All Depots Stock Summary Sheet",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Inward | Outward Correction Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Dealer Sheet",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
      { label: "Add Entry", route: "submenulink2" }
    ]
  },
  {
    name: "DSR Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Labour Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
      { label: "Download All Depot", route: "submenulink2" }
    ]
  },
  {
    name: "Visitor Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
      { label: "Add Entry", route: "submenulink2" }
    ]
  },
  {
    name: "Outward Transport",
    route: "menulink2",
    subMenu: [
      { label: "Calculate Freight", route: "submenulink1" },
      { label: "Freight Report", route: "submenulink2" }
    ]
  },
  {
    name: "Damage Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "/home/DamageReport" },
    ]
  },
  {
    name: "Upload Factory Arrival",
    route: "menulink2",
    subMenu: [
      { label: "Upload", route: "submenulink1" },
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Damage Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Attendance Report",
    route: "menulink2",
    subMenu: [
      { label: "View Report", route: "submenulink1" },
    ]
  },
  {
    name: "Swap Data",
    route: "menulink2",
    subMenu: [
      { label: "Inward", route: "submenulink1" },
      { label: "Outward", route: "submenulink1" },
    ]
  },
  {
    name: "Transshipment Difference",
    route: "menulink2",
    subMenu: [
      { label: "Difference", route: "submenulink1" },
    ]
  },
  {
    name: "Upload File List",
    route: "menulink2",
    subMenu: [
      { label: "Download", route: "submenulink1" },
    ]
  },
  {
    name: "Eway Bill",
    route: "menulink2",
    subMenu: [
      { label: "Eway Bill", route: "submenulink1" },
    ]
  },
  {
    name: "Upload",
    route: "menulink2",
    subMenu: [
      { label: "Upload Documents", route: "submenulink1" },
    ]
  }]
  isFullScreen: boolean = false;

  constructor(
    public serviceService: MainService,
    public router: Router,
    public loginservice: ApiServiceService,
    private activatedRoute: ActivatedRoute,
    public ToolTipsService: CustomToolTipsService,
    public modal: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.AppVersion = 'v' + this.serviceService.environment.AppVersion
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeData = this.getCurrentRouteData(this.activatedRoute);
        this.serviceService.TITLE_OF_PAGE = (routeData?.title)
      }
    })
  }

  select(type: string | number, item: any, $event: { stopPropagation: () => any; }) {
    this.selected[type] = (this.selected[type] === item ? null : item);
    $event ? $event.stopPropagation() : null;
  }

  isActive(type: string | number, item: any) {
    return this.selected[type] === item;
  }

  CallingTooltips($event: any) {
    // this.ToolTipsService.ShowToolTips($event, {
    //   Emp_Id: this.serviceService.getSessionLogin()['Emp_Id'],
    //   Role: this.serviceService.getSessionLogin()['Role'],
    //   Depot_Name: this.serviceService.getSessionLogin()['Depot_Name'],
    //   Depot_Code: this.serviceService.getSessionLogin()['Depot_Code']
    // }, 'Employee Details');
  }

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
      console.log('Fullscreen mode:', this.isFullScreen);
    });

    this.serviceService.getSessionLogin().subscribe((res: any) => {
      this.SESSION_DATA = { ...res, ...res?.data }
    })
    if (isPlatformBrowser(this.platformId)) {
      const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
      const leftMenu = document.querySelector("#sidebar .side-menu.top .left-menu");
      const SideMenu = document.querySelectorAll("#sidebar .side-menu");
      allSideMenu.forEach((item) => {
        const li: any = item.parentElement;
        item.addEventListener("click", function () {
          allSideMenu.forEach((i: any) => {
            i.parentElement.classList.remove("active");
          });
          li.classList.add("active");
        });
      });

      // TOGGLE SIDEBAR
      const menuBar: any = document.querySelector(".change-menu");
      const sidebar: any = document.getElementById("sidebar");

      // Sidebar toggle işlemi
      menuBar.addEventListener("click", function () {
        sidebar.classList.toggle("hide");
        if (sidebar.classList.value.indexOf("hide") != -1) {
          leftMenu?.setAttribute("style", "display:none");
          SideMenu.forEach((item) => item?.setAttribute("style", "display:none"))
        } else {
          leftMenu?.setAttribute("style", "display:block")
          SideMenu.forEach((item) => item?.setAttribute("style", "display:block"))
        }
      });

    }
  }


  // Menülerin açılıp kapanması için fonksiyon
  toggleMenu(menuId: any) {
    const menu: any = document.getElementById(menuId);
    const allMenus: any = document.querySelectorAll(".menu");

    // Diğer tüm menüleri kapat
    allMenus.forEach(function (m: any) {
      if (m !== menu) {
        m.style.display = "none";
      }
    });

    // Tıklanan menü varsa aç, yoksa kapat
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  historyBack() {
    window.history.back()
  }

  historyNext() {
    window.history.forward()
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    console.log("DashboardPageComponent destroy")
  }

  @ViewChild("UserPopup", { static: false }) UserPopup: any;
  UserInfoView() {
    this.modal.open(this.UserPopup,
      {
        title: "User Details",
        body: "",
        data: { name: "Helloo" },
        bghide: true,
        headerhide: true,

      })
  }

  private getCurrentRouteData(route: ActivatedRoute): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data;
  }

  goFullScreen(): void {
    const elem = document.documentElement; // or any specific element
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) { // Safari
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { // IE11
      (elem as any).msRequestFullscreen();
    }
  }

  exitFullScreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) { // Safari
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // IE11
      (document as any).msExitFullscreen();
    }
  }
}
