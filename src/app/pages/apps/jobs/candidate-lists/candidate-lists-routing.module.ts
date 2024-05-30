import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { ListViewComponent } from './list-view/list-view.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { UploadcvComponent } from "../../../uploadcv/uploadcv.component";

const routes: Routes = [
  {
    path: "listview",
    component: ListViewComponent
  },
  {
    path: "gridview",
    component: GridViewComponent
  },
  {
    path: "uploadcv",
    component: UploadcvComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateListsRoutingModule { }
