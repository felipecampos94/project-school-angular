import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupportRoutingModule} from './support-routing.module';
import {SupportComponent} from './support.component';
import {SharedModule} from "../../shared/shared.module";
import {SupportMaterialModule} from "../../shared/materials/support-mat.module";


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SupportMaterialModule,
    SharedModule
  ]
})
export class SupportModule {
}
