import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Camper } from 'src/app/models/camper';
import { CsvManager } from 'src/app/services/csv-manager.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  campers$: Observable<Camper[]> = of([]);

  constructor(private csv: CsvManager) { }


  ngOnInit(): void {
    this.campers$ = this.csv.campers$;
  }

  changeListener($event: any): void { 
    const files: FileList = $event.target.files;

    if (files && files.length > 0) {
      // Not interested in uploading multiple files at once
      // so lets grab the first file in the array and pass it in
      const file: File =  files.item(0) as File;
      this.csv.importCampers(file);
    } 
  }

  select(camper: Camper){ 
    this.csv.removeCamper(camper);
  }


}
