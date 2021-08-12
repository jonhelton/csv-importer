import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Camper } from 'src/app/models/camper';
import { CampersManager } from 'src/app/services/campers-manager.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterContentChecked, OnInit  {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<Camper>;

  displayedColumns: string[] = ['make', 'brand', 'sleeps', 'price'];
  constructor(public csv: CampersManager) {
   }

   ngOnInit() { 
    this.dataSource = new MatTableDataSource(this.csv.campers);
    this.dataSource.filterPredicate = 
    (data: Camper, filter: string) => { 
      return (data.make.toLowerCase().indexOf(filter) != -1 
      || data.brand.toLowerCase().indexOf(filter) != -1 
      || data.capacity.toString().toLowerCase().indexOf(filter) != -1
      || data.price.toString().toLowerCase().indexOf(filter) != -1) 
    } 
   }

   ngAfterContentChecked () {
      this.dataSource.sort = this.sort;
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
    this.dataSource.filter = filterValue?.value?.trim().toLowerCase();
  }

}
