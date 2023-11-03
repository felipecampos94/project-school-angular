import {Component, inject, OnInit} from '@angular/core';
import {Category, Course} from "../../../shared/models/course";
import {CoursesService} from "../../../services/courses.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {catchError, debounceTime, EMPTY, Observable, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'
  ]
})
export class CourseListComponent implements OnInit {
  public courseList: Course[] = [];
  private courseService = inject(CoursesService);
  private formBuilder = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);
  public categoryValue = Object.values(Category);
  public form!: FormGroup;
  public courseData!: Observable<any>;

  public totalCount: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 5;

  private validation(): void {
    this.form = this.formBuilder.group({
      category: [''],
      search: [''],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.form.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value) {
          this.getCourses(this.currentPage,
            this.pageSize,
            this.f.category.value ?? '',
            this.f.search.value ?? '')
        }
      });
    this.getCourses(1, 5, '', '');
  }

  public doSearch(): void {
    this.getCourses(this.currentPage,
      this.pageSize,
      this.f.category.value ?? '',
      this.f.search.value ?? '');
  }

  public getCourses(currentPage: number,
                    pageSize: number,
                    category: string,
                    search: string): void {
    this.courseData = this.courseService.get(currentPage, pageSize, category, search)
      .pipe(
        tap((response) => {
          this.courseList = response.body as Course[];
          let totalCount = response.headers.get('X-Total-Count');
          this.totalCount = totalCount ? Number(totalCount) : 0;
        }),
        catchError((err: string) => {
          this.snackbar.open(err, 'Close', {
            duration: 2000
          })
          return EMPTY;
        })
      )
  }

  public handlePageEvent(event: PageEvent): void {
    this.currentPage = (event.pageIndex + 1);
    this.pageSize = event.pageSize;
    this.getCourses(this.currentPage,
      this.pageSize,
      this.f.category.value ?? '',
      this.f.search.value ?? '')
  }
}
