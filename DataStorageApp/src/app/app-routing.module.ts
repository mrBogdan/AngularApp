import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FilesComponent } from "./files/files.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FileDetailComponent } from "./file-detail/file-detail.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'files', component: FilesComponent },
    { path: 'detail/:id', component: FileDetailComponent },
    { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
