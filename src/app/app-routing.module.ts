import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
  path: 'upload',
  component: UploadComponent,
},
{
  path: '**', // Navigate to Home Page if not found any page
  redirectTo: 'upload',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
