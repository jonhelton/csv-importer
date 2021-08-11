import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Camper } from 'src/app/models/camper';
import { CampersManager } from 'src/app/services/campers-manager.service';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterContentChecked  {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<Camper>;

  displayedColumns: string[] = ['make', 'brand', 'sleeps', 'price'];
  constructor(public csv: CampersManager) {
   }

   ngAfterContentChecked () {
      this.dataSource = new MatTableDataSource(this.csv.campers);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        
        let test =  data.make.toLowerCase().includes(filter);
        console.log( test);
        return test;
      };
  }

  changeListener($event: any): void { 
    const files: FileList = $event.target.files;

    if (files && files.length > 0) {
      const file: File =  files.item(0) as File;
      this.csv.importCampers(file);
    } 
  }

  select(camper: Camper){ 
    this.csv.removeCamper(camper);
  }


  applyFilter(filterValue: any) {
    filterValue.value = filterValue?.value?.trim(); // Remove whitespace
    filterValue.value = filterValue?.value?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue.value);
    this.dataSource.filter = filterValue.value;
  }

}
