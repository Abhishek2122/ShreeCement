import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { CustomToolTipsService } from '../../core/services/custom-tool-tips.service';
import { ApiServiceService } from '../../core/services/api-service.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  SESSION_DATA: any = [];
  previousUrl: string = '';
  menuList: any;
  selected: any = {};
  constructor(public serviceService: ServiceService,
    public router: Router,
    public loginservice: ApiServiceService,
    public ToolTipsService: CustomToolTipsService) {
    this.SESSION_DATA = this.serviceService.getSessionLogin();
    this.menuList = [{
      name: "Inward Sheet",
      route: "menulink2",
      subMenu: [
        { label: "View Report", route: "submenulink1" },
        { label: "Add Entry", route: "submenulink2" }
      ]
    },
    {
      name: "Outward Sheet",
      route: "menulink2",
      subMenu: [
        { label: "View Report", route: "submenulink1" },
        { label: "Add Entry", route: "submenulink2" }
      ]
    },
    {
      name: "Stock Report",
      route: "menulink2",
      subMenu: [
        { label: "View Report", route: "submenulink1" },
      ]
    },
    {
      name: "File Upload Details and Deletion",
      route: "menulink2",
      subMenu: [
        { label: "View Report", route: "submenulink1" },
      ]
    },
    {
      name: "Upload : Inward | Outward",
      route: "menulink2",
      subMenu: [
        { label: "View Report", route: "submenulink1" },
        { label: "Add Entry", route: "submenulink2" }
      ]
    }
    ]
  }

  select(type: string | number, item: any, $event: { stopPropagation: () => any; }) {
    this.selected[type] = (this.selected[type] === item ? null : item);
    $event ? $event.stopPropagation() : null;
  }

  isActive(type: string | number, item: any) {
    return this.selected[type] === item;
  }

  CallingTooltips($event: any) {
    this.ToolTipsService.ShowToolTips($event, {
      Emp_Id: this.serviceService.getSessionLogin()['Emp_Id'],
      Role: this.serviceService.getSessionLogin()['Role'],
      Depot_Name: this.serviceService.getSessionLogin()['Depot_Name'],
      Depot_Code: this.serviceService.getSessionLogin()['Depot_Code']
    }, 'Employee Details');
  }

  ngOnInit(): void {
    $('#sidebarToggle').click(() => {
      if ($('.side-nav-bar').hasClass('active-class')) {
        $('.side-nav-bar').removeClass('active-class');
        $('.side-nav-cls').addClass('visible');
      } else {
        $('.side-nav-bar').addClass('active-class');
        $('.side-nav-cls').removeClass('visible');
      }
    });
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
    const menuBar: any = document.querySelector("#content nav .bx.bx-menu");
    const sidebar: any = document.getElementById("sidebar");

    // Sidebar toggle işlemi
    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hide");
      if (sidebar.classList.value.indexOf("hide") != -1) {
        leftMenu?.setAttribute("style", "display:none");
        SideMenu.forEach((item)=>item?.setAttribute("style", "display:none"))
      } else {
        leftMenu?.setAttribute("style", "display:block")
        SideMenu.forEach((item)=>item?.setAttribute("style", "display:block"))
      }
    });

    // Sayfa yüklendiğinde ve boyut değişimlerinde sidebar durumunu ayarlama
    function adjustSidebar() {
      if (window.innerWidth <= 576) {
        sidebar.classList.add("hide"); // 576px ve altı için sidebar gizli
        sidebar.classList.remove("show");
      } else {
        sidebar.classList.remove("hide"); // 576px'den büyükse sidebar görünür
        sidebar.classList.add("show");
      }
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde sidebar durumunu ayarlama
    window.addEventListener("load", adjustSidebar);
    window.addEventListener("resize", adjustSidebar);

    // Dark Mode Switch
    const switchMode: any = document.getElementById("switch-mode");

    switchMode.addEventListener("change", function (e: any) {
      if (e.target?.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });

    // Notification Menu Toggle
    document.querySelector(".notification")?.addEventListener("click", function () {
      document.querySelector(".notification-menu")?.classList.toggle("show");
      document.querySelector(".profile-menu")?.classList.remove("show"); // Close profile menu if open
    });

    // Profile Menu Toggle
    document.querySelector(".profile")?.addEventListener("click", function () {
      document.querySelector(".profile-menu")?.classList.toggle("show");
      document.querySelector(".notification-menu")?.classList.remove("show"); // Close notification menu if open
    });

    // Close menus if clicked outside
    window.addEventListener("click", function (e: any) {
      if (!e.target.closest(".notification") && !e.target.closest(".profile")) {
        document.querySelector(".notification-menu")?.classList.remove("show");
        document.querySelector(".profile-menu")?.classList.remove("show");
      }
    });

    // Başlangıçta tüm menüleri kapalı tut
    document.addEventListener("DOMContentLoaded", function () {
      var allMenus = document.querySelectorAll(".menu");
      allMenus.forEach(function (menu: any) {
        menu.style.display = "none";
      });
      console.log(allMenus);
    });
  }


  // Menülerin açılıp kapanması için fonksiyon
  toggleMenu(menuId: any) {
    var menu: any = document.getElementById(menuId);
    var allMenus: any = document.querySelectorAll(".menu");

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
}
