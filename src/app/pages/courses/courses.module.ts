import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesComponent} from './courses.component';
import {CoursesMaterialModule} from "../../shared/materials/courses-mat.module";
import {SharedModule} from "../../shared/shared.module";
import {CourseListComponent} from './course-list/course-list.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoursesMaterialModule,
    SharedModule,
  ]
})
export class CoursesModule {
}
