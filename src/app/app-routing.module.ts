import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';

const routes: Routes = [
  { path: "", component: LoginPageComponent, pathMatch: "full" },
  { path: "home", loadChildren: () => import("./features/features.module").then(m => m.FeaturesModule) },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
